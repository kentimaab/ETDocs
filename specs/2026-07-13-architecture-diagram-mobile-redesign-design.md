# Architecture diagram ("Hur det hänger ihop") — mobile redesign

## Problem

The homepage's "Hur det hänger ihop" section (`.arch-wrap`) visualizes a 3-tier architecture (Lösningar/Skript → Klientapplikationer → Ethiris VMS Kärna/Kommunikation) as horizontal bands, each with a fixed-width label column, a fixed-width sub-label column, and a flexible content area of wrapped "chip" pills. The fixed-width columns use `flex-shrink: 0`, so on narrow viewports they refuse to shrink and force the content area down to near-zero width. A prior fix added horizontal scrolling on mobile (`overflow-x: auto` below 900px), but the user reports it still "looks weird" — scrolling a wide, dense table on a phone is an awkward reading experience even though nothing is visually broken anymore.

Desktop layout must not change.

## Approach

Add a second, separate markup block containing a simplified mobile view, and toggle visibility between it and the existing desktop diagram purely with CSS media queries (matching the pattern already used for `.hp-product-grid` at the 900px breakpoint). No JavaScript, no changes to the existing desktop HTML/CSS.

Two other approaches were considered and rejected:
- **CSS-only reflow of the existing markup** — impossible without JS/duplication, since the desktop markup has no short descriptions or "read more" links, only the full chip lists.
- **JS-driven accordion/progressive disclosure** — adds maintenance and accessibility surface for a homepage decoration, and doesn't match the requirement (link to detail *elsewhere*, not in-place expansion).

## Content — 5 cards, one per existing sub-group

Simplification level: keep the diagram's 5 existing sub-groups (not collapsed to 3 tiers), each becomes one card with a title, one-line description, and a "Läs mer →" link.

| Card (sv title) | Description (sv) | Links to |
|---|---|---|
| Lösningar | Färdiga lösningar som numerplåtsavläsning och systemintegration | `losningar/nummerplatsavlasning/oversikt.md` |
| Skript | Färdiga JavaScript-skript för Ethiris skriptmiljö | `losningar/index.md` |
| Klienter | Ethiris Client, Mobile och webbklient för åtkomst till systemet | `ethiris/index.md#komponenter-i-ett-ethiris-system` |
| Kärna | Kameror, inspelning, larm, användare och övrig kärnfunktionalitet | `ethiris/index.md` |
| Kommunikation | Kamerastöd via ONVIF och ledande tillverkares protokoll | `ethiris/index.md#kamerastod-och-onvif` |

English copy (`docs-en/index.md`) gets the same 5 cards translated, with equivalent anchors in the English `ethiris/index.md` (already verified to exist from the prior translation pass: `#components-in-an-ethiris-system`, `#camera-support-and-onvif`).

## Visual design

Cards reuse the existing product-card visual language (`.hp-product` styling: bordered box, small uppercase label, title, one-line description, arrow link) rather than inventing a new component — same design system, different density. Stacked vertically, full width, in the same 5-item order as the desktop diagram reads top-to-bottom (Lösningar, Skript, Klienter, Kärna, Kommunikation).

New class names (to avoid clashing with existing `.hp-product`/`.arch-*` styles and keep the toggle simple):
- `.arch-mobile` — wrapper, hidden by default, shown only below 900px
- `.arch-mobile__card` — one card
- `.arch-mobile__label`, `.arch-mobile__desc`, `.arch-mobile__link` — inner elements

## Implementation

**HTML** (`docs/index.md`, `docs-en/index.md`): after the existing `.arch-wrap` block (unchanged), add a new `.arch-mobile` block with the 5 cards described above.

**CSS** (`docs/assets/stylesheets/extra.css`, `docs-en/assets/stylesheets/extra.css`, kept identical between the two):
- Base rule: `.arch-mobile { display: none; }`
- Base rule: card styling (border, padding, border-radius, label/desc/link typography) — visible whenever the block is shown, no need to gate this part behind a media query
- `@media (max-width: 900px)`: `.arch-mobile { display: flex; flex-direction: column; gap: 0.75rem; }` and `.arch-wrap { display: none; }` (hide the desktop diagram entirely on mobile, replacing the horizontal-scroll fallback from the previous fix)

This keeps exactly one of the two blocks in the DOM visible at a time based on viewport width — standard, reliable, no layout thrashing or JS required.

## Files touched

- `docs/index.md` — add `.arch-mobile` block after `.arch-wrap`
- `docs-en/index.md` — same, translated
- `docs/assets/stylesheets/extra.css` — add `.arch-mobile*` rules + update the existing `@media (max-width: 900px)` block
- `docs-en/assets/stylesheets/extra.css` — same

## Verification

- `zensical build --clean` (both configs) must report no issues
- Confirm in built HTML: `.arch-mobile` block present with correct 5 cards and links; `.arch-wrap` (desktop diagram) untouched
- Confirm in built CSS: `.arch-mobile` hidden by default, shown only under the 900px breakpoint; `.arch-wrap` hidden under the same breakpoint
- Manual check: resize browser across the 900px breakpoint locally (via `zensical serve`) to confirm the swap is clean with no double-rendering or gap
