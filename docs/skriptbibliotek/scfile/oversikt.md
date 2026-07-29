# scFile – Översikt

`scFile` gör det möjligt för Ethiris att skriva och läsa data från en lokal textfil direkt från skriptmiljön. Varje rad som skrivs stämplas automatiskt med datum och klockslag, vilket gör skriptet perfekt för enkel loggning av händelser, larm eller mätvärden.

## Vad gör skriptet?

- Skriver en tidsstämplad textrad i slutet av en angiven fil
- Läser hela innehållet i en fil och returnerar det som text
- Hanterar öppning, skrivning och stängning av filen automatiskt

## Typiska användningsområden

**Händelseloggning**
Logga när larm aktiveras och inaktiveras till en textfil som kan sparas och granskas i efterhand – utan att förlita sig på Ethiris interna larmhistorik.

**Exportera mätvärden**
Spara bandbreddsmätningar eller kamerastatus med regelbundna intervall till en CSV-liknande fil som enkelt kan importeras till Excel eller andra system.

**Kommunikation med externa system**
Skriv data till en fil som ett externt program (t.ex. ett PLC-system eller kundapplikation) läser in periodiskt – ett enkelt sätt att dela information utan direktintegration.

**Spara konfigurationsvärden**
Läs in ett konfigurationsvärde (t.ex. ett gränsvärde eller ett schema) från en fil som kan ändras utan att Ethiris-konfigurationen behöver sparas om.

## Krav

| Krav | Beskrivning |
|------|-------------|
| Mappen måste finnas | Mappen som filen ska ligga i måste skapas manuellt. Standardsökväg: `C:/Ethiris/Log/`. |
| Inga skriptberoenden | Skriptet är fristående och kräver inga andra skriptbibliotek. |

