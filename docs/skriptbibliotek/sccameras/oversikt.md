# scCameras – Översikt

`scCameras` ger Ethiris möjligheten att kontinuerligt övervaka kamerornas driftstatus och nätverksprestanda. När något avviker – en kamera tappar anslutning, en inspelning slutar fungera eller bandbredden överstiger ett satt gränsvärde – kan systemet reagera omedelbart och trigga åtgärder i realtid.

## Vad gör skriptet?

- Kontrollerar om någon kamera har ett aktivt kommunikationsfel (offline)
- Kontrollerar om någon kamera har ett aktivt inspelningsfel
- Mäter genomsnittlig bandbredd per kamera (baserat på de senaste 10 sekunderna)
- Beräknar total bandbredd för alla kameror sammantaget
- Beräknar genomsnittlig inspelad datamängd per timme (baserat på den senaste veckan)
- Skickar händelser till huvudskriptet när status förändras eller ett gränsvärde passeras

Alla händelsedrivna funktioner triggar **enbart vid förändring** – inte vid varje kontrollintervall – vilket håller nere antalet notifieringar.

## Typiska användningsområden

**Automatisk larmnotifiering vid kameraavbrott**
Trigga ett larm i Ethiris eller skicka ett e-postmeddelande (via `scMail`) automatiskt när en kamera tappar anslutningen – utan att personalen behöver sitta och övervaka systemet manuellt.

**Övervaka nätverksprestanda**
Sätt ett gränsvärde för genomsnittlig eller total bandbredd och larm om nätverket är överbelastat. Användbart i installationer med många kameror och begränsad nätverkskapacitet.

**Kontrollera att inspelningen fungerar**
Få omedelbar indikation om inspelningen slutar fungera på en eller flera kameror – exempelvis vid fullt lagringsutrymme eller konfigurationsfel.

**Planering av lagringskapacitet**
Hämta genomsnittlig inspelad datamängd per timme (baserat på senaste veckan) för att beräkna hur länge det befintliga lagret räcker, och varna i god tid innan det tar slut.

## Krav

| Krav | Beskrivning |
|------|-------------|
| `scExtensions` | Skriptbiblioteket `scExtensions` måste vara laddat innan `scCameras`. |

