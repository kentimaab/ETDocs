# scSunriseSet – Översikt

`scSunriseSet` beräknar lokal tid för soluppgång och solnedgång för valfri geografisk position, angiven i latitud och longitud. Skriptet uppdaterar sig automatiskt varje midnatt och direkt efter att Ethiris startar, och levererar tiderna som händelser till huvudskriptet – utan att du behöver polla eller beräkna något själv.

## Vad gör skriptet?

- Beräknar exakt lokal tid för soluppgång och solnedgång baserat på latitud och longitud
- Skickar ett event med tiderna en sekund efter att Ethiris Server startas eller sparas
- Uppdaterar automatiskt varje midnatt inför nästa dags tider
- Kan triggas manuellt via `getData()` när som helst
- Returnerar: `sunrise`, `sunset`, `latitude`, `longitude`, `date`, `name` och en färdigformaterad `text`-sträng

## Typiska användningsområden

**Aktivera nattläge automatiskt**
Byt till IR-kameror, nattinspelningsprofil eller högre rörelsedetektionskänslighet exakt när solen går ner – och återgå till dagsprofilen vid soluppgång. Ingen manuell justering krävs under årets gång.

**Styra utomhusbelysning via Ethiris**
Trigga reläer eller I/O-utgångar för att tända belysning vid solnedgång och släcka vid soluppgång – exakt anpassat till aktuellt datum och plats, inte ett fast klockslag.

**Tidbaserade larmregler efter dagsljus**
Aktivera skärpta larmprofiler på natten och mer toleranta under dagen, utan att bygga scheman som måste underhållas manuellt varje säsong.

**Loggning av dagsljustimmar**
Kombinera med `scFile` för att logga soluppgång och solnedgång dagligen – användbart för energiuppföljning eller systemanalys över tid.

## Krav

| Krav | Beskrivning |
|------|-------------|
| `scExtensions` | Skriptbiblioteket `scExtensions` måste vara laddat innan `scSunriseSet`. |
| Licens: Advanced / Universal nivå 4 | Skriptbiblioteket kräver licensnivå Advanced eller Universal nivå 4 eller högre. |

!!! tip "Standardposition"
    Om latitud och longitud inte anges används standardvärdet `55.6405, 13.2134` (Staffanstorp). Ange alltid korrekt position för installationsplatsen för att få rätt soluppgångs- och solnedgångstider.

