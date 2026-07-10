# scMail – Översikt

`scMail` skickar automatiskt e-post när larm aktiveras eller återställs i Ethiris. Varje e-postmeddelande innehåller en lista med berörda larm samt en sammanfattning av alla larm som fortfarande är aktiva – utan att personalen behöver logga in i systemet för att se statusen.

## Vad gör skriptet?

- Söker igenom `DataStore` efter alla konfigurerade larm vid uppstart
- Kontrollerar larmstatusförändringar med ett konfigurerbart intervall
- Skickar ett e-postmeddelande när ett eller flera larm aktiveras
- Skickar ett e-postmeddelande när ett eller flera larm inaktiveras
- Inkluderar en lista över alla fortfarande aktiva larm i varje meddelande

## Typiska användningsområden

**Larmnotifiering till väktare eller driftpersonal**
Skicka omedelbar e-post till en väktarcentral, fastighetsskötare eller drifttekniker när ett inbrotts-, brand- eller tekniklarm aktiveras – utan att de behöver sitta och övervaka Ethiris manuellt.

**Daglig statusrapport via e-post**
Kombinera med en timer för att skicka en daglig sammanfattning av vilka larm som är aktiva, vilket ger en snabb kontroll av systemhälsan.

**Eskalering av olösta larm**
Skicka e-post till en sekundär kontakt om ett larm förblir aktivt längre än förväntat – exempelvis om ett dörrlarm inte återställs efter arbetstid.

**Audit trail och dokumentation**
Använd e-posthistoriken som ett enkelt sätt att dokumentera larmmönster och responstider utan att behöva exportera data ur Ethiris.

## Krav

| Krav | Beskrivning |
|------|-------------|
| E-postobjekt i DataStore | Ett e-postobjekt med namnet `Mail1` (justerbart) måste vara konfigurerat i Ethiris Admin-klienten. |
| `scExtensions` | Skriptbiblioteket `scExtensions` måste vara laddat innan `scMail`. |

!!! warning "E-postkonfiguration"
    Kontrollera att SMTP-server, avsändaradress och mottagare är korrekt inställda i Ethiris Admin-klienten innan skriptet aktiveras.

