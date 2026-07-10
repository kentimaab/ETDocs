# scSNMP – Översikt

`scSNMP` hämtar data från nätverksansluten utrustning via SNMP-protokollet och levererar informationen som händelser till Ethiris huvudskript. Skriptet är händelsedrivet – du behöver inte polla efter ny data, allt sköts automatiskt i konfigurerbara intervall. Skriptet innehåller fördefinierade MIB-profiler för Synology NAS, HP-switchar och Aruba-switchar, och kan övervaka flera enheter samtidigt.

## Vad gör skriptet?

- Hämtar systemstatus, temperatur, strömförsörjning och fläktstatus från Synology NAS
- Övervakar enskilda hårddiskar: hälsostatus, temperatur, dåliga sektorer och återstående livslängd
- Skickar ett event om systemtemperaturen överstiger ett konfigurerbart gränsvärde
- Hämtar CPU-användning, minnesstatus, portstatus och fläktstatus från HP- och Aruba-switchar
- Övervakar PoE-status per port på Aruba-switchar (spänning, ström, effekt och typ)
- Kan övervaka flera enheter av samma eller olika typer samtidigt
- Stödjer polling i fast intervall **eller** manuell datahämtning via `getData()`

## Typiska användningsområden

**Temperaturlarm för NAS och serverrum**
Larm automatiskt i Ethiris – eller skicka e-post via `scMail` – om NAS-enhetens temperatur överstiger ett gränsvärde. Fångar överhettning i god tid, exempelvis vid ett AC-haveri i serverrummet.

**Hårddiskövervakning och proaktiv driftvarning**
Övervaka hälsostatus och temperatur på samtliga diskar i NAS-enheten. Larm direkt när en disk rapporterar problem – långt innan ett haveri sker och inspelningsdata riskerar att gå förlorad.

**Nätverksövervakning utan extra verktyg**
Identifiera om en switch-port tappat länk (kamerakabel ur), om bandbredden är onormalt hög eller om en fläkt slutat fungera – utan att behöva logga in i en separat nätverkshanteringsportal.

**PoE-övervakning för IP-kameror**
Håll koll på effektförbrukning per PoE-port. Onormal strömförbrukning kan indikera ett hårdvaruproblem på kameran, och ett larm kan triggas automatiskt.

**Samla all driftövervakning i ett system**
Visa NAS- och switchstatus som variabler direkt i Ethiris operatörsgränssnitt – ett enda ställe för tekniker och väktare att kontrollera hela systemhälsan.

## Testade enheter

| Enhet | Tillgängliga profiler |
|-------|----------------------|
| Synology RS1219+ | SynologySystemMIB, SynologyDiskMIB, SynologySystemTemperatureCheck |
| HPE OfficeConnect 1950 12XGT 4SFP+ | HPSystemMIB, HPPortMIB, HPFanMIB |
| Aruba Instant On 1930 24G Class4 PoE (JL683B) | ArubaSystemMIB, ArubaFanMIB, ArubaPortMIB, ArubaPoeMIB |

## Krav

| Krav | Beskrivning |
|------|-------------|
| `scExtensions` | Skriptbiblioteket `scExtensions` måste vara laddat innan `scSNMP`. |
| Ethiris 14 eller senare | Skriptbiblioteket kräver minst Ethiris version 14. |
| Licens: Skriptbibliotek | Licensfunktionen "Skriptbibliotek" måste vara aktiverad. |
| Licens: SNMP reader | Ethirisfunktionen "SNMP reader" måste vara licensierad. |
| SNMP aktiverat på enheten | SNMPv2c måste vara aktiverat på den enhet som ska övervakas. |
| Nätverksåtkomst | Ethiris-servern måste nå enheten på SNMP-porten (standard: UDP 161). |

