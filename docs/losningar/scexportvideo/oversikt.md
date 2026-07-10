# scExportVideo – Översikt

`scExportVideo` exporterar automatiskt videomaterial när ett larm aktiveras. Hela sekvensen – inklusive kamerornas konfigurerade pre- och postalarmsinspelning – sparas som en komplett videofil utan att en operatör behöver ingripa.

## Vad gör skriptet?

- Lyssnar på statusförändringar för angivna larmobjekt
- Sparar tidpunkten när larmet aktiverades
- Väntar tills post-alarm-tiden har löpt ut efter att larmet inaktiveras
- Exporterar videomaterialet till en angiven mapp i `.ethe`-format
- Inkluderar automatiskt kamerornas konfigurerade pre- och postalarmstider
- Aktiverar ett valfritt feillarm om exporten misslyckas
- Hanterar ett flertal larm och kameror i samma instans

## Typiska användningsområden

**Automatisk bevishantering vid säkerhetshändelser**
Exportera videosekvenser automatiskt vid inbrottslarm, rörelsedetektion eller andra säkerhetshändelser. Filerna är omedelbart tillgängliga för väktare, polisen eller försäkringsbolaget – utan att personalen behöver söka manuellt i inspelningarna.

**Regelverkskrav på videoarkivering**
Uppfyll krav från försäkringsbolag eller myndigheter på att videomaterial kring larmhändelser arkiveras och kan uppvisas i efterhand.

**Automatisk dokumentation av varuleveranser eller fordonrörelser**
Koppla ett larm till en grindöppning eller ett rörelsedetekorområde och exportera automatiskt videomaterial varje gång en händelse inträffar – som en tidsstämplad logg av aktiviteten.

**Effektivare hantering för väktarbolag**
Istället för att väktare manuellt behöver exportera klipp efter en händelse sker allt automatiskt. Filerna finns redo att skickas direkt efter larmet återställts.

## Krav

| Krav | Beskrivning |
|------|-------------|
| Larmobjekt konfigurerade | De larmobjekt som ska trigga export måste finnas i Ethiris och ha kameror kopplade till sig. |
| Exportmappen måste finnas | Den angivna målmappen måste skapas manuellt. Skriptet kan inte skapa mappar. |
| Inga skriptberoenden | Skriptet är fristående och kräver inga andra skriptbibliotek. |

!!! info "Exportformat"
    Videofiler exporteras i Ethiris-formatet `.ethe`. Dessa öppnas med Ethiris Player.

