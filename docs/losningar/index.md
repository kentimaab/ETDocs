# Skriptbibliotek

Ethiris skriptbibliotek är en samling färdiga skript som utökar funktionaliteten i Ethiris VMS. Skripten är skrivna i JavaScript och körs direkt i Ethiris inbyggda skriptmiljö – utan att kräva externa beroenden eller extra programvara.

## Vad är skriptbiblioteket?

Ethiris har ett kraftfullt inbyggt skriptstöd som gör det möjligt att automatisera beteenden, reagera på händelser och integrera med externa system. Skriptbiblioteket samlar beprövade och välstrukturerade skript som täcker vanliga behov i verkliga installationer.

Varje skript i biblioteket är:

- **Självständigt eller utbyggbart** – kan användas fristående eller kombineras med andra skript
- **Händelsedrivet** – reagerar på förändringar i systemet snarare än att ständigt pollas
- **Konfigurerbara** – parametrar och tröskelvärden anpassas enkelt för varje installation

## Tillgängliga skript

| Skript | Beskrivning |
|--------|-------------|
| [scExtensions](scextensions/oversikt.md) | Grundläggande hjälpfunktioner och gemensamma verktyg som övriga skript bygger på |
| [scFile](scfile/oversikt.md) | Läs och skriv filer från Ethiris skriptmiljö |
| [scSaveImage](scsaveimage/oversikt.md) | Spara stillbilder från kameror automatiskt vid händelser |
| [scMail](scmail/oversikt.md) | Skicka e-postmeddelanden direkt från Ethiris |
| [scCameras](sccameras/oversikt.md) | Övervaka kamerors driftstatus och nätverksprestanda |
| [scSunRiseSet](scsunriseset/oversikt.md) | Styr beteenden baserat på soluppgång och solnedgång |
| [scSNMP](scsnmp/oversikt.md) | Hämta och övervaka SNMP-värden från nätverksutrustning |
| [scExportVideo](scexportvideo/oversikt.md) | Exportera videosekvenser automatiskt vid händelser |

## Komma igång

De flesta skript kräver att `scExtensions` är laddat först – det tillhandahåller gemensamma hjälpfunktioner som de övriga skripten förlitar sig på. Börja med att läsa översikten för det skript du vill använda och följ sedan installationsanvisningarna i respektive skripts användningssida.
