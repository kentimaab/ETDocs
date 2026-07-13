# Architecture Diagram Mobile Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's "Hur det hänger ihop" / "How it fits together" architecture diagram with a simplified, linked-card layout on mobile (≤900px), while leaving the existing desktop diagram completely unchanged.

**Architecture:** Add a second, hidden-by-default markup block (`.arch-mobile`, 5 cards) right after the existing `.arch-wrap` diagram in both homepages. A CSS media query at the existing 900px breakpoint swaps visibility: `.arch-wrap` hidden / `.arch-mobile` shown below 900px, and the reverse above it. No JavaScript.

**Tech Stack:** Zensical (static site generator), plain HTML embedded in Markdown, plain CSS (no preprocessor, no build step for CSS).

## Global Constraints

- Desktop layout (`.arch-wrap` and everything inside it) must not change in markup or CSS — verify by diffing against current content before/after.
- `docs/` and `docs-en/` must stay content-identical in structure (same components, translated text) — this project's established convention throughout its history.
- CSS additions must include a dark-mode variant using the `[data-md-color-scheme="kentima-dark"]` selector pattern already used everywhere else in `extra.css` — a new component with no dark-mode rule will look broken (unreadable text) when the user's theme toggle is set to dark.
- Verification in this project has no automated test suite — "tests" are `zensical build --clean` (must report "No issues found") plus `grep` checks against the generated HTML/CSS in `site/`, exactly as done throughout this project's history.
- Internal links use the site's existing clean-URL convention confirmed in `docs/index.md`: `href="losningar/nummerplatsavlasning/oversikt/"`, `href="losningar/index/"`, `href="ethiris/index/"` (trailing slash, no `.md`, no `#index` fragment for the root of a page).
- Anchor IDs must match the *actual* generated `id=` attributes, not assumed slugs. Confirmed by grepping `site/ethiris/index.html` and `site/en/ethiris/index.html`:
  - Swedish: `id="komponenter-i-ett-ethiris-system"`, `id="kamerastod-och-onvif"`
  - English: `id="components-in-an-ethiris-system"`, `id="camera-support-and-onvif"`

---

## File Structure

| File | Change |
|---|---|
| `docs/assets/stylesheets/extra.css` | Replace the mobile `.arch-wrap`/`.arch-tier` horizontal-scroll rules (from the prior fix) with `.arch-wrap { display: none }` / `.arch-mobile { display: flex }`. Add new `.arch-mobile*` base + dark-mode rules. |
| `docs-en/assets/stylesheets/extra.css` | Identical mirror of the above. |
| `docs/index.md` | Add `.arch-mobile` HTML block (5 Swedish cards) immediately after the closing `</div>` of `.arch-wrap`. |
| `docs-en/index.md` | Add `.arch-mobile` HTML block (5 English cards) immediately after the closing `</div>` of `.arch-wrap`. |

No other files are touched. No new files are created.

---

### Task 1: CSS — add `.arch-mobile` styling and flip the mobile toggle (Swedish stylesheet)

**Files:**
- Modify: `docs/assets/stylesheets/extra.css`

**Interfaces:**
- Produces: CSS classes `.arch-mobile`, `.arch-mobile__card`, `.arch-mobile__label`, `.arch-mobile__desc`, `.arch-mobile__link` — Task 3 (Swedish HTML) will use these exact class names.

- [ ] **Step 1: Read the current file around the target sections to get exact surrounding text**

Run: `grep -n "arch-mini-chips\|Responsive\|arch-wrap {\|arch-tier {" "docs/assets/stylesheets/extra.css"`

Expected: shows the `.arch-mini-chips` block (~line 1285), the `/* ── Responsive ── */` comment (~line 1378), and inside the `@media (max-width: 900px)` block the `.arch-wrap {` and `.arch-tier {` rules added by the prior fix (~line 1400-1408). Use the exact line numbers reported to locate the edit points below (they may have shifted slightly from these approximate values).

- [ ] **Step 2: Insert the new `.arch-mobile` base styling immediately before the `/* ── Responsive ── */` comment**

Find this exact anchor text (the last rule before the responsive block):

```css
.arch-content--core .arch-mini-chips span,
.arch-content--comms .arch-mini-chips span {
    font-size: 0.7rem;
    padding: 0.18em 0.55em;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
}

/* ── Responsive ── */
```

Replace it with:

```css
.arch-content--core .arch-mini-chips span,
.arch-content--comms .arch-mini-chips span {
    font-size: 0.7rem;
    padding: 0.18em 0.55em;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
}

/* ── Simplified architecture cards for mobile (hidden on desktop) ── */
.arch-mobile {
    display: none;
    flex-direction: column;
    gap: 0.75rem;
}

.arch-mobile__card {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 1rem 1.1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    text-decoration: none !important;
    transition: border-color 0.15s;
}

.arch-mobile__card:hover {
    border-color: #aaa;
}

.arch-mobile__label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #f9991b;
}

.arch-mobile__desc {
    font-size: 0.85rem;
    color: #444;
    line-height: 1.4;
}

.arch-mobile__link {
    font-size: 0.8rem;
    font-weight: 600;
    color: #111;
    margin-top: 0.2rem;
}

[data-md-color-scheme="kentima-dark"] .arch-mobile__card {
    border-color: #2d2d2d;
}

[data-md-color-scheme="kentima-dark"] .arch-mobile__card:hover {
    border-color: #555;
}

[data-md-color-scheme="kentima-dark"] .arch-mobile__desc {
    color: rgba(255, 255, 255, 0.7);
}

[data-md-color-scheme="kentima-dark"] .arch-mobile__link {
    color: rgba(255, 255, 255, 0.87);
}

/* ── Responsive ── */
```

- [ ] **Step 3: Replace the prior horizontal-scroll mobile fix with the show/hide toggle**

Find this exact block inside `@media (max-width: 900px) { ... }`:

```css
    .arch-wrap {
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
    }
    .arch-tier {
        min-width: 640px;
    }
```

Replace it with:

```css
    .arch-wrap {
        display: none;
    }
    .arch-mobile {
        display: flex;
    }
```

- [ ] **Step 4: Verify the file has no syntax errors by building the site**

Run: `cd "c:/Git/Ethiris/Ethiris Docs" && zensical build --clean`
Expected: `No issues found` (a broken CSS file doesn't fail a Zensical build, but this confirms the overall build pipeline is still healthy before moving on)

- [ ] **Step 5: Commit**

```bash
cd "c:/Git/Ethiris/Ethiris Docs"
git add docs/assets/stylesheets/extra.css
git commit -m "Add mobile-simplified architecture cards CSS (Swedish stylesheet)"
```

---

### Task 2: CSS — mirror Task 1's changes to the English stylesheet

**Files:**
- Modify: `docs-en/assets/stylesheets/extra.css`

**Interfaces:**
- Consumes: nothing from Task 1 (this is a parallel mirror, not a dependency)
- Produces: same CSS classes as Task 1 — Task 4 (English HTML) will use these exact class names.

- [ ] **Step 1: Confirm the English stylesheet has byte-identical anchor text**

Run: `diff <(sed -n '1260,1420p' "docs/assets/stylesheets/extra.css") <(sed -n '1260,1420p' "docs-en/assets/stylesheets/extra.css")`
Expected: no output (files identical in this range) — if there's a diff, adjust the anchor text in the steps below to match the English file's actual content instead of assuming it's identical.

- [ ] **Step 2: Apply the identical edit from Task 1 Step 2**

Find the same anchor text as Task 1 Step 2 in `docs-en/assets/stylesheets/extra.css` and make the identical replacement (same CSS block, byte-for-byte).

- [ ] **Step 3: Apply the identical edit from Task 1 Step 3**

Find the same anchor text as Task 1 Step 3 in `docs-en/assets/stylesheets/extra.css` and make the identical replacement.

- [ ] **Step 4: Verify both stylesheets are identical again**

Run: `diff "docs/assets/stylesheets/extra.css" "docs-en/assets/stylesheets/extra.css"`
Expected: no output (the two files should be byte-identical — this has been true throughout the project's history since `extra.css` is a straight copy between languages)

- [ ] **Step 5: Build the English site to confirm no errors**

Run: `cd "c:/Git/Ethiris/Ethiris Docs" && zensical build --config-file zensical-en.toml --clean`
Expected: `No issues found`

- [ ] **Step 6: Commit**

```bash
cd "c:/Git/Ethiris/Ethiris Docs"
git add docs-en/assets/stylesheets/extra.css
git commit -m "Add mobile-simplified architecture cards CSS (English stylesheet)"
```

---

### Task 3: HTML — add the 5 Swedish mobile cards to the homepage

**Files:**
- Modify: `docs/index.md`

**Interfaces:**
- Consumes: CSS classes from Task 1 (`.arch-mobile`, `.arch-mobile__card`, `.arch-mobile__label`, `.arch-mobile__desc`, `.arch-mobile__link`)
- Produces: nothing consumed by later tasks (Task 4 is a parallel translation, not a dependency)

- [ ] **Step 1: Find the exact closing markup of the `.arch-wrap` block**

Run: `grep -n "arch-wrap\|hp-kentima\"" "docs/index.md"`
Expected: shows the opening `<div class="arch-wrap">` line and, a few lines later, the closing `</div>` that ends it, followed by a blank line, `</div>` (closing `.hp-section`), blank line, then `<div class="hp-kentima">`. Confirm the exact line numbers before editing.

- [ ] **Step 2: Insert the `.arch-mobile` block between the end of `.arch-wrap` and the end of its parent `.hp-section`**

Find this exact anchor text (the end of the architecture diagram section):

```html
      </div>

    </div>
  </div>

  <div class="hp-kentima">
```

Replace it with:

```html
      </div>

      <div class="arch-mobile">
        <a href="losningar/nummerplatsavlasning/oversikt/" class="arch-mobile__card">
          <span class="arch-mobile__label">Lösningar</span>
          <span class="arch-mobile__desc">Färdiga lösningar som numerplåtsavläsning och systemintegration.</span>
          <span class="arch-mobile__link">Läs mer →</span>
        </a>
        <a href="losningar/index/" class="arch-mobile__card">
          <span class="arch-mobile__label">Skript</span>
          <span class="arch-mobile__desc">Färdiga JavaScript-skript för Ethiris skriptmiljö.</span>
          <span class="arch-mobile__link">Läs mer →</span>
        </a>
        <a href="ethiris/index/#komponenter-i-ett-ethiris-system" class="arch-mobile__card">
          <span class="arch-mobile__label">Klienter</span>
          <span class="arch-mobile__desc">Ethiris Client, Mobile och webbklient för åtkomst till systemet.</span>
          <span class="arch-mobile__link">Läs mer →</span>
        </a>
        <a href="ethiris/index/" class="arch-mobile__card">
          <span class="arch-mobile__label">Kärna</span>
          <span class="arch-mobile__desc">Kameror, inspelning, larm, användare och övrig kärnfunktionalitet.</span>
          <span class="arch-mobile__link">Läs mer →</span>
        </a>
        <a href="ethiris/index/#kamerastod-och-onvif" class="arch-mobile__card">
          <span class="arch-mobile__label">Kommunikation</span>
          <span class="arch-mobile__desc">Kamerastöd via ONVIF och ledande tillverkares protokoll.</span>
          <span class="arch-mobile__link">Läs mer →</span>
        </a>
      </div>

    </div>
  </div>

  <div class="hp-kentima">
```

(If Step 1's grep showed different surrounding whitespace/indentation than shown here, match the file's actual formatting rather than this exact whitespace — the important part is that the `.arch-mobile` block sits as a sibling right after `.arch-wrap`'s closing `</div>`, still inside the same `.hp-section`.)

- [ ] **Step 2: Build the Swedish site**

Run: `cd "c:/Git/Ethiris/Ethiris Docs" && zensical build --clean`
Expected: `No issues found`

- [ ] **Step 3: Verify the desktop diagram is untouched**

Run: `grep -c "arch-tier__label" "site/index.html"`
Expected: same count as before this task (3 — one per tier: Lösningar/Skript, Klientapplikationer, Ethiris VMS). This confirms the existing desktop markup wasn't accidentally modified.

- [ ] **Step 4: Verify the 5 mobile cards are present with correct links**

Run: `grep -oE 'arch-mobile__card"[^>]*href="[^"]*"|href="[^"]*" class="arch-mobile__card"' "site/index.html"`

(if that doesn't match due to attribute order, instead run: `grep -A1 'class="arch-mobile"' "site/index.html" | head -20` and manually confirm 5 `<a>` tags with hrefs `losningar/nummerplatsavlasning/oversikt/`, `losningar/index/`, `ethiris/index/#komponenter-i-ett-ethiris-system`, `ethiris/index/`, `ethiris/index/#kamerastod-och-onvif`)

Expected: all 5 links present, each resolving to a page that exists (`site/losningar/nummerplatsavlasning/oversikt/index.html`, `site/losningar/index.html`, `site/ethiris/index.html` — confirm each with `ls`).

- [ ] **Step 5: Commit**

```bash
cd "c:/Git/Ethiris/Ethiris Docs"
git add docs/index.md
git commit -m "Add simplified mobile architecture cards to Swedish homepage"
```

---

### Task 4: HTML — add the 5 English mobile cards to the homepage

**Files:**
- Modify: `docs-en/index.md`

**Interfaces:**
- Consumes: CSS classes from Task 2 (identical names to Task 3)
- Produces: nothing consumed by later tasks

- [ ] **Step 1: Find the exact closing markup of the `.arch-wrap` block**

Run: `grep -n "arch-wrap\|hp-kentima\"" "docs-en/index.md"`
Expected: same structure as Task 3 Step 1, in English. Confirm exact line numbers.

- [ ] **Step 2: Insert the English `.arch-mobile` block in the same position as Task 3**

Find this exact anchor text:

```html
      </div>

    </div>
  </div>

  <div class="hp-kentima">
```

Replace it with:

```html
      </div>

      <div class="arch-mobile">
        <a href="losningar/nummerplatsavlasning/oversikt/" class="arch-mobile__card">
          <span class="arch-mobile__label">Solutions</span>
          <span class="arch-mobile__desc">Ready-made solutions like license plate recognition and system integration.</span>
          <span class="arch-mobile__link">Read more →</span>
        </a>
        <a href="losningar/index/" class="arch-mobile__card">
          <span class="arch-mobile__label">Scripts</span>
          <span class="arch-mobile__desc">Ready-made JavaScript scripts for the Ethiris scripting environment.</span>
          <span class="arch-mobile__link">Read more →</span>
        </a>
        <a href="ethiris/index/#components-in-an-ethiris-system" class="arch-mobile__card">
          <span class="arch-mobile__label">Clients</span>
          <span class="arch-mobile__desc">Ethiris Client, Mobile, and web client for accessing the system.</span>
          <span class="arch-mobile__link">Read more →</span>
        </a>
        <a href="ethiris/index/" class="arch-mobile__card">
          <span class="arch-mobile__label">Core</span>
          <span class="arch-mobile__desc">Cameras, recording, alarms, users, and other core functionality.</span>
          <span class="arch-mobile__link">Read more →</span>
        </a>
        <a href="ethiris/index/#camera-support-and-onvif" class="arch-mobile__card">
          <span class="arch-mobile__label">Communication</span>
          <span class="arch-mobile__desc">Camera support via ONVIF and leading manufacturers' protocols.</span>
          <span class="arch-mobile__link">Read more →</span>
        </a>
      </div>

    </div>
  </div>

  <div class="hp-kentima">
```

(Same note as Task 3 Step 2 regarding matching actual whitespace/indentation.)

- [ ] **Step 3: Verify the link target `losningar/nummerplatsavlasning/oversikt/` and `losningar/index/` exist unchanged in the English tree (not translated paths)**

Run: `ls "docs-en/losningar/nummerplatsavlasning/oversikt.md" "docs-en/losningar/index.md"`
Expected: both files exist (the English site mirrors the same Swedish directory/file names throughout this project — only content is translated, not paths — confirmed by every other internal link in `docs-en/index.md`)

- [ ] **Step 4: Build the English site**

Run: `cd "c:/Git/Ethiris/Ethiris Docs" && zensical build --config-file zensical-en.toml --clean`
Expected: `No issues found`

- [ ] **Step 5: Verify the desktop diagram is untouched**

Run: `grep -c "arch-tier__label" "site/en/index.html"`
Expected: 3 (same as Task 3 Step 3, English tree)

- [ ] **Step 6: Verify the 5 mobile cards are present**

Run: `grep -A1 'class="arch-mobile"' "site/en/index.html" | head -20`
Expected: 5 `<a>` tags with hrefs `losningar/nummerplatsavlasning/oversikt/`, `losningar/index/`, `ethiris/index/#components-in-an-ethiris-system`, `ethiris/index/`, `ethiris/index/#camera-support-and-onvif`

- [ ] **Step 7: Commit**

```bash
cd "c:/Git/Ethiris/Ethiris Docs"
git add docs-en/index.md
git commit -m "Add simplified mobile architecture cards to English homepage"
```

---

### Task 5: Final cross-check — both sites, both breakpoints

**Files:** none (verification only)

**Interfaces:** none

- [ ] **Step 1: Full clean rebuild of both sites**

Run:
```bash
cd "c:/Git/Ethiris/Ethiris Docs"
zensical build --clean
zensical build --config-file zensical-en.toml --clean
```
Expected: `No issues found` for both

- [ ] **Step 2: Confirm the CSS toggle is present and correctly scoped to the 900px breakpoint in both built stylesheets**

Run: `grep -B2 -A2 '\.arch-mobile {' "site/assets/stylesheets/extra.css" | grep -A2 "display: flex"`
Expected: shows `.arch-mobile { display: flex; }` nested inside the `@media (max-width: 900px)` block (i.e. this second occurrence of the rule, not the base `display: none` one)

Run: `grep -B2 -A2 '\.arch-wrap {' "site/assets/stylesheets/extra.css" | grep -A1 "display: none"`
Expected: shows `.arch-wrap { display: none; }` present

- [ ] **Step 3: Confirm no leftover references to the old horizontal-scroll fix**

Run: `grep -n "overflow-x: auto" "site/assets/stylesheets/extra.css"`
Expected: no match for `.arch-wrap`/`.arch-tier` context (the old prior-fix rules were fully replaced in Task 1/2 — if this greps a hit, check it belongs to some unrelated component, not `.arch-wrap`)

- [ ] **Step 4: Manual visual check via local dev server**

Run: `cd "c:/Git/Ethiris/Ethiris Docs" && zensical serve`
Open `http://127.0.0.1:8000/` in a browser, open dev tools, toggle device toolbar / resize the window across the 900px width boundary. Confirm:
- Above 900px: the original horizontal-band diagram shows, 5 mobile cards are absent from the rendered page
- At or below 900px: the diagram disappears, 5 cards appear stacked vertically, each with visible label/description/link
- Clicking each card navigates to the expected page/anchor
- Toggling dark mode (moon/sun icon in header) keeps card text readable in both themes

Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 5: Commit the plan's completion (only if Step 4 passed)**

No code changes in this task — if Step 4 surfaces a problem, fix it in the relevant Task 1-4 file and re-run that task's build+grep checks before returning here.

---

## Self-Review Notes

- **Spec coverage:** Task 1-2 cover the CSS approach (dark-mode variant included per Global Constraints, not explicitly in the original spec but required by "follow existing patterns"). Task 3-4 cover the 5-card content table exactly as specified, including all 5 link targets. Task 5 covers the spec's "Verification" section line-by-line (build clean, correct markup, correct CSS scoping, manual breakpoint check).
- **Placeholder scan:** no TBD/TODO; every step has literal content, not descriptions of content.
- **Type/name consistency:** `.arch-mobile`, `.arch-mobile__card`, `.arch-mobile__label`, `.arch-mobile__desc`, `.arch-mobile__link` are used identically across Tasks 1-4 — no naming drift.
