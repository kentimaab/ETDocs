"""
Post-build optimizer for the Static Web Apps deploy (250 MB limit on the Free plan).

Runs on the built site, after both `zensical build` steps:

1. Media in the second-language build that is byte-identical to the main
   language's copy (site/<secondary>/X == site/X) is dropped, and the
   second-language pages are pointed at the main file.
2. Animated GIFs above --gif-min-mb are converted to MP4 (ffmpeg). The lightbox
   link + <img> around them is replaced by an autoplaying, looping, muted <video>.
   A conversion is only kept if the MP4 is clearly smaller than the GIF.
3. A file is only deleted when nothing references it any more (HTML attributes,
   or its name in CSS/JS/JSON/XML).

Unreferenced media is reported, never deleted.

Usage:
    python hooks/optimize_site.py site               # optimize in place
    python hooks/optimize_site.py site --dry-run     # report only, change nothing
                                                     # (still converts into a temp dir
                                                     #  to measure, if ffmpeg exists)
Options: --base /docs/  --secondary sv  --gif-min-mb 1  --max-mb 250
(--secondary is the second language's folder inside the site: sv for WQDocs,
en for ETDocs)
Exit code 1 if the optimized site is still above --max-mb (not in --dry-run).
"""

import argparse
import filecmp
import os
import posixpath
import re
import shutil
import subprocess
import sys
import tempfile
from urllib.parse import quote, unquote

MEDIA = ('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.mp4', '.ico')
TEXT = ('.css', '.js', '.json', '.xml', '.txt')
ATTR_RE = re.compile(r'\b(src|href|poster)="([^"]*)"', re.I)
ANCHOR_IMG_RE = re.compile(r'<a\b([^>]*)>\s*(<img\b[^>]*>)\s*</a>', re.I)
IMG_RE = re.compile(r'<img\b[^>]*>', re.I)
TAG_ATTR_RE = re.compile(r'([\w:-]+)(?:\s*=\s*"([^"]*)")?')
MB = 1024 * 1024


def walk(site):
    out = {}
    for d, _, files in os.walk(site):
        for f in files:
            full = os.path.join(d, f)
            out[os.path.relpath(full, site).replace(os.sep, '/')] = os.path.getsize(full)
    return out


def resolve(url, page, base):
    """Site-relative path that `url` on `page` points to, or None if external."""
    if not url or url.startswith(('http:', 'https:', '//', 'data:', 'mailto:', '#', 'javascript:')):
        return None
    path = unquote(url.split('#')[0].split('?')[0])
    if not path:
        return None
    if path.startswith(base):
        rel = path[len(base):]
    elif path.startswith('/'):
        return None
    else:
        rel = posixpath.join(posixpath.dirname(page), path)
    rel = posixpath.normpath(rel)
    return None if rel.startswith('..') else rel


def to_url(rel, base):
    return base + quote(rel, safe='/')


def tag_attrs(tag):
    inner = re.sub(r'^<\w+|/?>$', '', tag)
    return {k.lower(): (v or '') for k, v in TAG_ATTR_RE.findall(inner)}


def is_animated(path):
    with open(path, 'rb') as f:
        return f.read().count(b'\x21\xf9\x04') > 1  # graphic control extension per frame


def convert(ffmpeg, src, dst):
    subprocess.run(
        [ffmpeg, '-y', '-v', 'error', '-i', src,
         '-movflags', '+faststart', '-pix_fmt', 'yuv420p',
         '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
         '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-an', dst],
        check=True,
    )


def video_tag(img_tag, mp4_url):
    a = tag_attrs(img_tag)
    parts = [f'<video src="{mp4_url}" autoplay loop muted playsinline']
    if a.get('alt'):
        parts.append(f'aria-label="{a["alt"]}" title="{a.get("title") or a["alt"]}"')
    for k in ('class', 'id', 'width', 'height'):
        if a.get(k):
            parts.append(f'{k}="{a[k]}"')
    style = 'max-width:100%;height:auto;' + a.get('style', '')
    parts.append(f'style="{style}"></video>')
    return ' '.join(parts)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('site')
    ap.add_argument('--base', default='/docs/')
    ap.add_argument('--secondary', default='sv', help="second language's folder in the site")
    ap.add_argument('--gif-min-mb', type=float, default=1.0)
    ap.add_argument('--max-mb', type=float, default=250)
    ap.add_argument('--dry-run', action='store_true')
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding='utf-8')  # Windows consoles default to cp1252
    site, base, dry = args.site, args.base, args.dry_run

    files = walk(site)
    before = sum(files.values())
    full = lambda rel: os.path.join(site, rel)

    # 1. Second-language media identical to the main language's copy
    lang = args.secondary.strip('/') + '/'
    dup = {
        f: f[len(lang):] for f in files
        if f.startswith(lang) and f.lower().endswith(MEDIA) and f[len(lang):] in files
        and files[f] == files[f[len(lang):]]
        and filecmp.cmp(full(f), full(f[len(lang):]), shallow=False)
    }

    # 2. GIF -> MP4
    ffmpeg = shutil.which('ffmpeg')
    gifs = sorted(
        (f for f in files if f.lower().endswith('.gif') and f not in dup
         and files[f] >= args.gif_min_mb * MB),
        key=lambda f: -files[f],
    )
    converted, mp4_size, skipped = {}, {}, []
    tmp = tempfile.mkdtemp() if dry else None
    if gifs and not ffmpeg:
        skipped = [(g, 'no ffmpeg') for g in gifs]
    for g in gifs if ffmpeg else []:
        if not is_animated(full(g)):
            skipped.append((g, 'not animated'))
            continue
        mp4 = g[:-4] + '.mp4'
        out = os.path.join(tmp, mp4.replace('/', '_')) if dry else full(mp4)
        convert(ffmpeg, full(g), out)
        size = os.path.getsize(out)
        if size > 0.8 * files[g]:
            skipped.append((g, f'mp4 not smaller ({size / MB:.1f} MB)'))
            os.remove(out)
            continue
        converted[g], mp4_size[mp4] = mp4, size
    if tmp:
        shutil.rmtree(tmp, ignore_errors=True)

    # 3. Rewrite HTML (in memory first, so a dry run can count references)
    pages, videos = {}, 0
    for page in (f for f in files if f.endswith('.html')):
        with open(full(page), encoding='utf-8') as fh:
            html = fh.read()
        new = html

        def canon(url):
            t = resolve(url, page, base)
            return dup.get(t, t)

        def swap_anchor(m):
            nonlocal videos
            href = tag_attrs(f'<a{m.group(1)}>').get('href', '')
            img_src = tag_attrs(m.group(2)).get('src', '')
            t = canon(img_src)
            if t in converted and canon(href) == t:
                videos += 1
                return video_tag(m.group(2), to_url(converted[t], base))
            return m.group(0)

        def swap_img(m):
            nonlocal videos
            t = canon(tag_attrs(m.group(0)).get('src', ''))
            if t in converted:
                videos += 1
                return video_tag(m.group(0), to_url(converted[t], base))
            return m.group(0)

        def swap_attr(m):
            t = resolve(m.group(2), page, base)
            if t in dup:
                return f'{m.group(1)}="{to_url(dup[t], base)}"'
            return m.group(0)

        new = ANCHOR_IMG_RE.sub(swap_anchor, new)
        new = IMG_RE.sub(swap_img, new)
        new = ATTR_RE.sub(swap_attr, new)
        pages[page] = (html, new)

    # an MP4 no page ended up using (its GIF was unreferenced): keep the GIF as is
    for g, mp4 in list(converted.items()):
        if not any(to_url(mp4, base) in new for _, new in pages.values()):
            skipped.append((g, 'no page shows it as an image'))
            del converted[g], mp4_size[mp4]
            if not dry:
                os.remove(full(mp4))

    # 4. What is still referenced after the rewrite
    def targets(which):
        out = set()
        for page, html in ((p, h[which]) for p, h in pages.items()):
            for _, url in ATTR_RE.findall(html):
                t = resolve(url, page, base)
                if t:
                    out.add((page, t))
        return out

    referenced = {t for _, t in targets(1)}
    text_blob = []
    for f in files:
        if f.lower().endswith(TEXT):
            with open(full(f), encoding='utf-8', errors='ignore') as fh:
                text_blob.append(fh.read())
    text_blob = '\n'.join(text_blob)
    def still_used(f):
        if f in referenced:
            return True
        # a second-language duplicate shares its file name with the English original, so only
        # its full path counts; for anything else the bare file name is enough
        needle = f if f in dup else posixpath.basename(f)
        return needle in text_blob or quote(needle) in text_blob

    removable = [f for f in list(dup) + list(converted) if not still_used(f)]
    kept = [f for f in list(dup) + list(converted) if f not in removable]

    # Safety net: no link that worked before may point at a missing file afterwards
    exists_before = set(files)
    exists_after = (exists_before - set(removable)) | set(mp4_size)
    looks_like_file = lambda t: posixpath.splitext(t)[1] != ''
    broken_before = {(p, t) for p, t in targets(0) if looks_like_file(t) and t not in exists_before}
    broken_after = {(p, t) for p, t in targets(1) if looks_like_file(t) and t not in exists_after}
    newly_broken = sorted(broken_after - broken_before)

    # 5. Apply
    if not dry and not newly_broken:
        for page, (old, new) in pages.items():
            if new != old:
                with open(full(page), 'w', encoding='utf-8') as fh:
                    fh.write(new)
        for f in removable:
            os.remove(full(f))

    after = before - sum(files[f] for f in removable) + sum(mp4_size.values())
    orphans = sorted(
        (f for f in files if f.lower().endswith(MEDIA) and f not in removable
         and not f.startswith('assets/') and not f.startswith(lang + 'assets/')
         and not still_used(f)),
        key=lambda f: -files[f],
    )

    # Report (stdout + GitHub job summary)
    over = after > args.max_mb * MB
    lines = [
        f'## Site optimization{" (dry run: nothing changed)" if dry else ""}',
        '',
        '| | |',
        '|---|---|',
        f'| Before | {before / MB:.0f} MB, {len(files)} files |',
        f'| Duplicates in {lang} removed | {len([f for f in removable if f in dup])} files, '
        f'{sum(files[f] for f in removable if f in dup) / MB:.0f} MB |',
        f'| GIFs converted to MP4 | {len(converted)} '
        f'({sum(files[g] for g in converted) / MB:.0f} MB → {sum(mp4_size.values()) / MB:.0f} MB), '
        f'{videos} images swapped for video |',
        f'| Kept (still referenced) | {len(kept)} |',
        f'| Broken links | {len(broken_before)} already in the build, '
        f'{len(newly_broken)} caused by this step{" ⚠ NOTHING APPLIED" if newly_broken else " ✓"} |',
        f'| **After** | **{after / MB:.0f} MB** (limit {args.max_mb:.0f} MB){" ⚠ OVER" if over else " ✓"} |',
        '',
    ]
    if newly_broken:
        lines += ['**Links this step would break**', '']
        lines += [f'- `{p}` → `{t}`' for p, t in newly_broken[:20]]
        lines.append('')
    if converted:
        lines += ['**Converted**', '']
        lines += [f'- `{g}` {files[g] / MB:.1f} → {mp4_size[converted[g]] / MB:.1f} MB' for g in converted]
        lines.append('')
    if skipped:
        lines += ['**GIFs not converted**', '']
        lines += [f'- `{g}` ({files[g] / MB:.1f} MB): {why}' for g, why in skipped]
        lines.append('')
    if kept:
        lines += ['**Kept because something still references them**', '']
        lines += [f'- `{f}`' for f in kept[:20]]
        lines.append('')
    if orphans:
        lines += [f'**Unreferenced media (not deleted): {len(orphans)} files, '
                  f'{sum(files[f] for f in orphans) / MB:.0f} MB**. Largest:', '']
        lines += [f'- `{f}` {files[f] / MB:.1f} MB' for f in orphans[:15]]
        lines.append('')
    report = '\n'.join(lines)
    print(report)
    summary = os.environ.get('GITHUB_STEP_SUMMARY')
    if summary:
        with open(summary, 'a', encoding='utf-8') as fh:
            fh.write(report + '\n')
    if newly_broken:
        return 1
    return 1 if over and not dry else 0


if __name__ == '__main__':
    sys.exit(main())
