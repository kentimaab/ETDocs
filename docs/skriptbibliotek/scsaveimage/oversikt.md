# scSaveImage – Översikt

`scSaveImage` sparar automatiskt JPEG-bilder från kameror i Ethiris med ett konfigurerbart tidsintervall. Skriptet hanterar allt självständigt – det behöver inte anropas från huvudskriptet – och kontrollerar alltid att kameran är online och streamar video innan varje sparning, så att du aldrig sparar en trasig eller tom bild.

## Vad gör skriptet?

- Sparar JPEG-bilder från alla kameror, eller från en vald delmängd
- Kontrollerar att kameran är online och streamar video innan bild sparas
- Kör automatiskt i ett konfigurerbart intervall (standardvärde: 1 minut)
- Skriver status för varje sparning till Debug Output Panel i Ethiris Admin
- Hanterar fel utan att krascha – en offlinekamera påverkar inte övriga kameror

## Typiska användningsområden

**Automatisk bildarkivering**
Spara bilder från alla övervakningskameror var tredje minut till ett NAS eller en lokal mapp – utan att personalen behöver göra något manuellt. Bilderna kan användas som tidsstämplade bevis eller för att följa upp händelser i efterhand.

**Webbkameravy på hemsida eller intranät**
Spara bilder med korta intervall (t.ex. var 30:e sekund) och låt en webbserver visa dem på en informationsskärm eller portal. Personal och besökare kan se en aktuell vy utan att behöva komma åt Ethiris direkt.

**Bevisinsamling vid larm**
Kombinera med ett larmsystem: trigga tätare bildfrekvens när ett larm aktiveras och låt `scSaveImage` automatiskt dokumentera förloppet visuellt.

**Kontroll av kamerakvalitet och placering**
Använd regelbundet sparade bilder för att snabbt se om en kamera blivit felinriktad, skadad eller täckt – utan att behöva logga in i klientapplikationen.

## Krav

| Krav | Beskrivning |
|------|-------------|
| Ethiris 14 eller senare | Skriptbiblioteket kräver minst Ethiris version 14. |
| Licens: Skriptbibliotek | Licensfunktionen "Skriptbibliotek" måste vara aktiverad. |
| Sparmapp | Den konfigurerade sökvägen (`PATH`) måste finnas på servern innan skriptet startas. |

!!! warning "Fristående skript"
    `scSaveImage` är ett autonomt skriptbibliotek och ska **inte** anropas från huvudskriptet. Konfiguration görs direkt inuti skriptbiblioteket via parametrarna `TIMEOUT`, `PATH` och kameralistan.

!!! note "Befintliga bilder skrivs över"
    En ny bild skriver alltid över föregående. Skriptet behåller alltid den senaste bilden per kamera – inte en historik.

