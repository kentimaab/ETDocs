# scExtensions – Översikt

`scExtensions` är ett hjälpbibliotek som utökar Ethiris inbyggda skriptmiljö med saknade grundfunktioner. Det är ett tekniskt stödbibliotek som krävs av flera andra skriptbibliotek i samlingen.

## Vad gör skriptet?

Skriptet tillhandahåller ett antal verktyg som de övriga skriptbiblioteken bygger på:

- Beräknar medelvärde för en array med tal
- Kontrollerar om ett tal är jämnt eller udda
- Delar upp strängar vid en angiven avgränsare
- Söker igenom `DataStore` och samlar ihop alla konfigurerade larm
- Beräknar millisekunder kvar till midnatt (används för nattliga uppdateringar)
- Konverterar bytevärden till läsbar text med lämplig enhet (B, KiB, MiB, GiB osv.)

## Krav

| Krav | Beskrivning |
|------|-------------|
| Inga externa beroenden | Skriptet är fristående och kräver inga andra skriptbibliotek. |

!!! warning "Lägg till scExtensions först"
    `scCameras`, `scMail` och `scSunriseSet` kräver att `scExtensions` är laddad. Lägg alltid till `scExtensions` **före** dessa bibliotek i Ethiris skriptlista.

