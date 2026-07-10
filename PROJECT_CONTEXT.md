# Ethiris Docs – Projektkontext

## Vad är projektet?

Ethiris Docs är en Zensical-baserad dokumentationssite (liknande MkDocs med Material-tema) för Kentimas produkt Ethiris VMS. Projektet är uppbyggt på samma plattform och styling som WQDocs (`c:\Git\WQDocs`), som fungerar som referensprojekt.

---

## Katalogstruktur

```
c:\Git\Ethiris docs\
├── docs/                          # Svenska dokument (default)
│   ├── assets/
│   │   ├── favicon.ico
│   │   ├── logo.svg
│   │   ├── javascripts/
│   │   │   ├── custom.js
│   │   │   ├── scrollAnim.js
│   │   │   └── tag-filter.js
│   │   └── stylesheets/
│   │       └── extra.css
│   ├── ethiris/
│   │   ├── manual/index.md
│   │   ├── knowledge-base/
│   │   │   ├── index.md                                  # Översikt med artikeltabell
│   │   │   ├── kb2020010901-langsom-anslutning.md
│   │   │   ├── kb2021062101-sso-servicekonto.md
│   │   │   ├── kb2022022201-smtp-epost.md
│   │   │   ├── kb2023020201-gpu-adaptiva-strommar.md
│   │   │   ├── ethiris-vms-licensmodell.md
│   │   │   ├── kb2025092301-ethirismonitor-antivirus.md
│   │   │   └── KB2020010901.zip                          # Nedladdningsbar fil för registerlösning
│   │   ├── versionsnyheter/index.md
│   │   └── kamerastod/index.md
│   ├── losningar/                 # Befintliga lösningar
│   └── index.md
├── docs-en/                       # Engelska dokument
│   └── (samma struktur, saknar ethiris/-mappen)
├── overrides/
│   ├── home.html
│   └── stylesheets/extra.css
├── zensical.toml                  # Svenska config (default, språk=sv)
├── zensical-en.toml               # Engelska config (språk=en)
└── PROJECT_CONTEXT.md             # Denna fil
```

---

## Konfiguration

### zensical.toml (svenska, default)
- `docs_dir` = `docs` (default)
- `site_dir` = `site` (default)
- `language` = `sv`
- `extra_css` = `["assets/stylesheets/extra.css"]`
- Theme: `kentima` (light) / `kentima-dark` (dark)
- Alternates: Svenska på `/`, Engelska på `/en/`

### zensical-en.toml (engelska)
- `docs_dir` = `docs-en`
- `site_dir` = `site/en`
- `language` = `en`
- Annars identisk konfiguration

### Bygga och servera
```bash
# Bygg svenska siten
zensical build

# Bygg engelska siten
zensical build --config-file zensical-en.toml

# Servera (dev)
zensical serve
```

---

## Navigationsstruktur (zensical.toml)

```toml
nav = [
  { "Hem" = "index.md" },
  { "Ethiris" = [
    { "Manual" = "ethiris/manual/index.md" },
    { "Knowledge base" = [
      { "Översikt" = "ethiris/knowledge-base/index.md" },
      { "Långsam anslutning efter uppgradering" = "ethiris/knowledge-base/kb2020010901-langsom-anslutning.md" },
      { "SSO – Servicekonto i Active Directory" = "ethiris/knowledge-base/kb2021062101-sso-servicekonto.md" },
      { "Skicka e-post via SMTP" = "ethiris/knowledge-base/kb2022022201-smtp-epost.md" },
      { "GPU och Adaptiva videoströmmar" = "ethiris/knowledge-base/kb2023020201-gpu-adaptiva-strommar.md" },
      { "Ethiris VMS licensmodell" = "ethiris/knowledge-base/ethiris-vms-licensmodell.md" },
      { "EthirisMonitor64.sys och antivirusskydd" = "ethiris/knowledge-base/kb2025092301-ethirismonitor-antivirus.md" },
    ]},
    { "Versionsnyheter" = "ethiris/versionsnyheter/index.md" },
    { "Kamerastöd" = "ethiris/kamerastod/index.md" },
  ]},
  { "Lösningar" = [ ... ] },
  { "Skriptbibliotek" = [ ... ] },
]
```

---

## Styling

All styling är kopierad direkt från `c:\Git\WQDocs\docs\assets\stylesheets\extra.css` och är identisk. Temat heter `kentima` (light) och `kentima-dark` (dark).

**Viktiga CSS-klasser (ärvda från WQDocs):**
- `.hp-hero`, `.hp-product`, `.hp-role` – startsidans komponenter
- `.lp-hero`, `.lp-title`, `.lp-section-head` – product landing pages
- `.wq-*` – WideQuick-specifika komponenter (används även här)
- `.md-typeset details.release` – release-accordions

**Knappar:** `[Text](länk){ .md-button }` ger en Material-styled knapp, används bl.a. för nedladdningslänkar.

---

## Knowledge base – artiklar

Källmaterial: PDF-filer från `C:\Users\MarkusK\Desktop\Ethiris-skript\`.

| Fil | Källdokument | Innehåll |
|-----|-------------|---------|
| `kb2020010901-langsom-anslutning.md` | KB2020010901 | Långsam anslutning p.g.a. Windows rotcertifikatsuppdatering. Tre lösningar. Inkluderar nedladdningsbar `.zip` för registerlösning. |
| `kb2021062101-sso-servicekonto.md` | KB2021062101 | Steg-för-steg: skapa servicekonto i AD och konfigurera SSO i Ethiris Admin. |
| `kb2022022201-smtp-epost.md` | KB2022022201 | SMTP-inställningar, tabell med 10+ leverantörer, testinstruktioner och felsökning. |
| `kb2023020201-gpu-adaptiva-strommar.md` | KB2023020201 | GPU-avkodning och adaptiva videoströmmar – krav, grafikkort, stöd per klient/komponent. |
| `ethiris-vms-licensmodell.md` | (namnlös KB) | Fysisk/logisk kamera, videoström, licensberäkning för traditionell och Universal-modell. |
| `kb2025092301-ethirismonitor-antivirus.md` | KB2025092301 | EthirisMonitor64.sys flaggas av Windows Defender – tillåt eller ta bort. |

**Konventioner för knowledge base-artiklar:**
- Titlar utan KB-nummer (KB-numret används bara i filnamnet)
- Admonitions (`!!! note`, `!!! warning`) för viktig information
- Tabeller för jämförelser och inställningsvärden
- Nedladdningsbara filer läggs i `docs/ethiris/knowledge-base/` och länkas med `{ .md-button }`

---

## Vad som gjordes i sessionerna

### Session 1
1. **Theme-toggle fix** – Ikonerna i `zensical.toml` och `zensical-en.toml` var omvända. Fixades i båda filerna.
2. **Dark theme CSS** – Kopierades från WQDocs till `docs/assets/stylesheets/extra.css` och `docs-en/assets/stylesheets/extra.css`.
3. **JavaScript-filer** – Kopierades från WQDocs till båda `docs/` och `docs-en/`.
4. **Ny navigationssektion "Ethiris"** – Tillagd i `zensical.toml` med fyra undernoder: Manual, Knowledge base, Versionsnyheter, Kamerastöd.
5. **Placeholder-sidor** – Skapades under `docs/ethiris/` för alla fyra undernoder.

### Session 2
6. **Knowledge base-artiklar** – Skapade 6 artiklar från PDF-källmaterial (se tabell ovan).
7. **Navigationen uppdaterad** – Knowledge base expanderad med undernoder för varje artikel i `zensical.toml`.
8. **KB-nummer borttagna** ur artiklarnas H1-titlar.
9. **Nedladdningsfil** – `KB2020010901.zip` kopierad till `docs/ethiris/knowledge-base/` och länkad med en knapp i artikeln.

---

## Nästa steg

- Engelska versioner av knowledge base-artiklarna under `docs-en/ethiris/knowledge-base/`
- Fler PDF-artiklar att konvertera när sådana finns tillgängliga
- Innehåll för Manual, Versionsnyheter och Kamerastöd

---

## Referensprojekt

`c:\Git\WQDocs` – identisk teknikstack, fullt fungerande. Använd som referens för:
- Hur sidor struktureras
- Vilka CSS-klasser som finns
- Hur navigationen är uppbyggd
- Hur dark/light theme fungerar
