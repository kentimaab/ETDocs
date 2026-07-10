# Ethiris Docs – Session Summary

## What this project is

A Zensical documentation site for Ethiris VMS (Kentima's Video Management System), modelled after the WQDocs site at `c:\Git\WQDocs`. The project lives at `c:\Git\Ethiris docs`.

---

## What was set up

### Config – `zensical.toml`

All of the following were enabled (they were commented out or missing in the default template):

- `extra_css = ["assets/stylesheets/extra.css"]`
- `extra_javascript = ["assets/javascripts/custom.js", "assets/javascripts/scrollAnim.js", "assets/javascripts/tag-filter.js"]`
- `custom_dir = "overrides"`
- `favicon = "assets/favicon.ico"`
- `logo = "assets/logo.svg"`
- `"navigation.tabs"` feature enabled
- `"navigation.sections"` feature **disabled** (was in WQDocs but causes sections to appear permanently expanded — removed so sections collapse by default)
- `[project.markdown_extensions.pymdownx.snippets]` with `base_path = ["docs"]` and `check_paths = true`

Nav is fully defined (see below).

### Files created

| File | Purpose |
|---|---|
| `docs/assets/stylesheets/extra.css` | Kentima theme CSS (copied from `overrides/stylesheets/extra.css`, which was in the wrong place) |
| `docs/assets/javascripts/custom.js` | Placeholder |
| `docs/assets/javascripts/scrollAnim.js` | Placeholder |
| `docs/assets/javascripts/tag-filter.js` | Placeholder |
| `docs/assets/logo.svg` | **Placeholder** — copied from WQDocs, replace with Ethiris logo |
| `docs/assets/favicon.ico` | **Placeholder** — copied from WQDocs, replace with Ethiris favicon |
| `overrides/home.html` | Minimal template override (`{% extends "main.html" %}`) required by `docs/index.md` |
| `.gitignore` | Ignores `site/` |
| `.python-version` | Pins Python `3.13` |
| `TODO.md` | Reminder to replace logo and favicon |

---

## Navigation structure

```
Hem
Koncept
  └── Numerplåtsavläsning
  └── Omnis integration
Lösningar
  └── scExtensions
        ├── Översikt
        ├── Användning
        └── Avancerat
  └── scFile
        ├── Översikt
        ├── Användning
        └── Avancerat
  └── scSaveImage
        ├── Översikt
        ├── Användning
        └── Avancerat
  └── scMail
        ├── Översikt
        ├── Användning
        └── Avancerat
  └── scCameras
        ├── Översikt
        ├── Användning
        └── Avancerat
  └── scSunRiseSet
        ├── Översikt
        ├── Användning
        └── Avancerat
  └── scSNMP
        ├── Översikt
        ├── Användning
        └── Avancerat
  └── scExportVideo
        ├── Översikt
        ├── Användning
        └── Avancerat
```

All pages under Lösningar are stubs with a "Platshållare" admonition. The Oversikt pages are named `oversikt.md` (not `index.md`) — this is intentional so that `navigation.indexes` does not turn the section headers (scExtensions etc.) into page links; they are collapse-only toggles.

---

## Landing page – `docs/index.md`

Uses `template: home.html` and `hide: [navigation, toc, footer]` for a full-width layout.

Sections:
- **Hero** — dark background, Kentima orange accent, version badge v17.0, CTA linking to scExtensions
- **Produkter & Lösningar** — 2-column product grid: Ethiris VMS (blue) + scExtensions (brown)
- **Hur det hänger ihop** — architecture diagram with three tiers: Lösningar → Klientapplikationer → Ethiris VMS (Kärna + Kommunikation)
- **Made by Kentima** — footer strip with logo, description, link to kentima.com

---

## CSS additions (bottom of `extra.css`)

```css
.md-nav__item--nested > .md-nav__link {
    font-weight: 700;
}
```

Makes sidebar section headers (scExtensions, Lösningar, Koncept, etc.) bold.

---

## Things still to do

- Replace `docs/assets/logo.svg` with the real Ethiris logo
- Replace `docs/assets/favicon.ico` with the real Ethiris favicon
- Fill in content for all stub pages under Koncept and Lösningar
- Add the Ethiris VMS section to the nav if/when that content is ready
- Update the landing page CTA and product card links once VMS docs exist
