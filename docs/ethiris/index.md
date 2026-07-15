# Ethiris

Ett videoövervakningssystem behöver vara öppet nog att fungera med valfria kameror, skalbart nog att växa i takt med anläggningen, och tillräckligt integrerbart för att kopplas ihop med larm-, passage- och processystem. Det är utgångspunkten för Ethiris.

Ethiris (**Ethiris Video Management Software**, VMS) är Kentimas mjukvara för professionell videoövervakning. Kentima tillverkar även tillhörande hårdvara – Network Video Recorders (NVR), Network Video Clients (NVC), Network Video Panels (NVP) och kompletta racklösningar (NVRN Rack Solutions) – med Ethiris förinstallerat.

Produkterna används i alla typer av anläggningar, från mindre installationer till mycket stora och komplexa system med tusentals kameror – till exempel flygplatser, hamnar, köpcentrum, processindustri, offentliga byggnader, larmcentraler och trafiksystem.

Den här sidan går igenom Ethiris i tre delar: **produkt och licensiering** (komponenter, licensmodell), **klientfunktioner** (livevisning, videovägg, uppspelning, larm, ljud) och **administration och integration** (skript, SDK, serverdrift, ONVIF). Sidan tar också upp kamerastöd samt den hårdvara – NVR/NVC/NVP och racklösningar – som Kentima erbjuder och som Ethiris kan köras på.

## Ethiris VMS – öppen, flexibel och kraftfull

Ethiris är en komponentbaserad och skalbar 64-bitars mjukvara. Användaren och systemintegratören väljer önskade komponenter och anpassar mjukvaran efter behoven i den aktuella anläggningen. Den komponentbaserade uppbyggnaden gör att systemet kan installeras på flera geografiskt åtskilda anläggningar, och varje klient kan ansluta sig till ett obegränsat antal servrar.

### Komponenter i ett Ethiris-system

Ett komplett grundsystem kräver bara en Ethiris Server, en Ethiris Client och en Ethiris Admin – i mindre system kan alla tre köras på samma dator.

| | Komponent | Beskrivning |
|---|---|---|
| ![](images/es.png) | **Ethiris Server** | Kärnan i systemet. Sköter all kommunikation med kameror och spelar in bilder på en eller flera hårddiskar. Körs som en tjänst med automatisk start. Ett system kan bestå av en eller flera Ethiris Server. |
| ![](images/ec.png) | **Ethiris Client** | Visar livebilder och inspelad video. Kan ansluta till en eller flera Ethiris Server. Ett system kan innehålla flera klienter. |
| ![](images/ea.png) | **Ethiris Admin** | Konfigurerar de olika delarna i systemet. Kan, oavsett datorns placering, centralt konfigurera samtliga komponenter i anläggningen. |
| ![](images/em.png) | **Ethiris Mobile** | App för Android och iOS. Ger tillgång till livevideo och inspelad video, styrning av PTZ-kameror och I/O, samt larmvisning, via Wi-Fi och 4G/5G. |
| ![](images/os.png) | **Ethiris Server OPC Server** | Separat komponent som gör att andra system kan ansluta till Ethiris Server via **OPC** (en öppen kommunikationsstandard för industriell systemintegration), t.ex. för att starta inspelning eller styra en PTZ-kamera. |
| ![](images/ex.png) | **Ethiris ActiveX** | Komponent för att visa livevideo från valfri ansluten kamera i vilket annat system som helst med stöd för ActiveX-kontroller, t.ex. **WideQuick** (Kentimas mjukvara för överordnad system- och processövervakning, s.k. SCADA/PSIM – se [WideQuick PSIM](#widequick-psim)), kassasystem eller Microsoft Office. |
| ![](images/sv.png) | **Ethiris Signature Validator** | Separat programvara för att verifiera äktheten av exporterade jpg-bilder från Ethiris. |
| ![](images/ev.png) | **Ethiris Viewer** | Separat programvara för att titta på exporterad video i Ethiris eget exportformat. |
| ![](images/cs.png) | **Ethiris Camera Simulator** | Separat programvara för att simulera kameror med hjälp av Ethiris exportfiler, som kan användas i ett Ethiris-system t.ex. för tester. |

### Nyckelegenskaper

- **Kostnadseffektivt** – två licensmodeller: en prenumerationsbaserad (Universal, sex funktionsnivåer) och en där hela licensen betalas direkt (Free, Basic, Extended, Advanced, Premium). Licenskostnaden baseras på nivå och antal kameror; man kan även välja 5 års fria uppdateringar.
- **Hög prestanda och tillförlitlighet** – utvecklad för att kommunicera med ett stort antal kameror och samtidigt klara hög bildlagringshastighet. Stöd för både hårdvaruacceleration och adaptiva videoströmmar. Automatisk backup av konfigurationerna.
- **Snabb installation** – en konfigurationsguide med automatisk sökning efter kameror på nätverket snabbar upp konfigurationen. Tydlig översikt av lagringsenheter och statistikpaneler underlättar justering av inspelning.
- **Öppen plattform** – stöd för både enskilda kameraprotokoll och det generella ONVIF-protokollet.
- **Avancerad larm- och händelsehantering** – synkning av larmlista, händelselista och videospelare underlättar sökning av relevant video kopplad till en specifik händelse.
- **Kraftfull flexibilitet med skript** – en javabaserad skriptmotor öppnar i princip oändliga möjligheter att anpassa anläggningen efter kundens önskemål, genom smarta kopplingar mellan händelser och aktiviteter.
- **Brett språkstöd** – flera språk stöds i administrationsverktyget, klienten och de mobila applikationerna, med kontinuerligt tillkommande språk.
- **Snabb integration** – omfattande stöd för OPC, ONVIF, .Net SDK och databaskommunikation.
- **Larmcentraler** – stöd för att skicka larm och händelser till larmcentraler via **SIA-koder** (ett vanligt protokoll för larmöverföring), se [Larmcentraler](#larmcentraler).

## Prestanda och skalbarhet

Målsättningen har varit att en enda Ethiris Admin och en enda Ethiris Client ska kunna ansluta sig mot en anläggning bestående av **150 Ethiris Server med totalt 4 500 kameror**, utan att behöva dela upp konfigurationen.

- **Trädvyn i Ethiris Admin** är optimerad så att en ansluten Ethiris Server inte läses in i sin helhet förrän man klickar på den. Komprimerar man en laddad server i trädet (minustecken) laddas den ur Ethiris Admin igen och endast ikonen visas.
- **Inloggning** kan återanvändas för flera servrar, så att man bara behöver logga in en gång istället för separat på varje Ethiris Server som ska laddas i trädvyn.
- **Filtrering av kameralistan** – i sammanhang där man väljer kameror (t.ex. vid uppbyggnad av klientvyer) kan listan filtreras genom val av en specifik Ethiris Server. I ett test med totalt 4 500 kameror reducerades listan till 30 kameror vid val av en av de 150 servrarna.
- **Sektionering** – en stor konfiguration för hela systemet är att föredra framför flera mindre, eftersom bara en konfiguration kan laddas åt gången i Ethiris Admin och Ethiris Client. Anläggningen kan delas upp i sektioner med önskat djup (t.ex. land → län → stad), definierat i Ethiris Admin och visat som trädvy i Ethiris Client.
- **Redundans/kluster** – flera Ethiris-servrar kan slås ihop till ett **Ethiris Cluster** som utåt beter sig som en enda server. En av servrarna har rollen **Master** och har huvudansvaret för vissa gemensamma funktioner (t.ex. videoväggen, se [Ethiris videovägg](#ethiris-videovagg)); om Master-servern går ner tar en av de övriga medlemsservrarna automatiskt över rollen. Om en server går ner tar övriga automatiskt över dess kameror, och klienterna hämtar automatiskt bilder från rätt server. Ger även enklare lastbalansering (samma konfiguration distribueras automatiskt över flera serverdatorer).
- **Optimerad videolagring** – genom effektiv trådhantering som utnyttjar en NAS eller diskar med stöd för multipla simultana videoströmmar uppnås hög lagringsprestanda. Skrivning till disk prioriteras alltid framför läsning; om diskarna riskerar att inte hinna med skrivningen stryper Ethiris gradvis läsningen, så att klienter får vänta något längre på inspelad video.

!!! info "Licenskrav"
    Ethiris Cluster kräver licensnivå Premium eller Universal nivå 6.

## Licensmodell

Det finns två huvudvarianter:

| Modell | Beskrivning |
|---|---|
| **Universal** | Prenumerationsbaserad med månadskostnad, sex funktionsnivåer. Fria uppdateringar till senaste versionen ingår alltid. |
| **Free** | Kostnadsfri, men kraftigt begränsad: 1 kamera, 1 dags videolagring, 1 samtidig klient, kräver ständig internetuppkoppling, inga fria uppdateringar. Fungerar i praktiken som en testnivå snarare än en produktionslicens. |
| **Basic / Extended / Advanced / Premium** | Hela licensen betalas direkt baserat på nivå och antal kameror, med stegvis fler funktioner per nivå. 5 års fria uppdateringar kan väljas till. |

**Val av modell:** Universal är mest flexibel – funktionsnivå, antal kameror och optioner kan ändras när som helst direkt i Ethiris Admin utan kontakt med Kentima. Antalet kameror är obegränsat och bestäms av det antal som lagts upp i konfigurationen; allt rapporteras automatiskt till Kentima och faktureras kvartalsvis i efterskott baserat på användningen. Det kräver dock kontinuerlig internetuppkoppling för automatisk återrapportering (systemet klarar sig i 24 timmar utan internetkontakt efter första kontakten med Kentima).

Med Free–Premium kan antalet kameror ökas i efterhand och licensnivån höjas (men inte sänkas) – utökningar och uppgraderingar beställs hos Kentima. Stora system kan byggas genom att fördela olika licensnivåer (Basic–Universal) på flera datorer i samma system.

**Förutsättningar:** Ethiris VMS kör på Windows. Varje dator som kör Ethiris Server behöver en egen unik Produktkod, beställd från Kentima. För Basic–Premium anges antal kameror vid beställning och licensen registreras via Kentimas partnersidor. En Universalkod kräver ingen separat registrering eftersom det sköts automatiskt via internetuppkopplingen.

**Hosting och multiinstans:** En Universallicens lämpar sig särskilt väl för hostingtjänster, i kombination med funktionen multipla instanser av Ethiris Server (se [Serveradministration](#multipla-instanser-av-ethiris-server)) – upp till 30 parallella instanser på samma dator med en gemensam licens.

### Licensöversikt

De vanligaste funktionerna som kräver en högre licensnivå eller tillköpt option, samlade på ett ställe. Fullständig och alltid aktuell licenstabell finns hos Kentima.

| Funktion | Minsta krav |
|---|---|
| E-post/sms-notifiering | Basic |
| OPC-klient, signerad JPG-export | Extended |
| Skapa egna klientvyer direkt i klienten | Extended eller Universal nivå 3 |
| Ethiris Monitor (hårdvaruövervakning) | Extended eller Universal nivå 3 |
| Skriptbibliotek | Advanced eller Universal nivå 4 |
| Ethiris Cluster (redundans) | Premium eller Universal nivå 6 |
| Kryptering av video- och datafiler | Premium |
| Single Sign On och 2FA | Premium eller Universal nivå 6 |
| Videovägg (kräver även tillköpt option) | Premium eller Universal nivå 6 |
| .Net plug-in (kräver även tillköpt option) | Premium (option) |
| Ethiris SDK (kräver även tillköpt option) | Premium eller Universal nivå 6 (option) |
| Automatisk export av video (kräver även tillköpt option) | Premium eller Universal nivå 6 (option) |
| Multipla instanser av Ethiris Server | Universal nivå 6 |

## Kamerastöd och ONVIF

Ethiris har stöd för både det generella ONVIF-protokollet och individuella protokoll från ledande kameratillverkare. Samtliga ONVIF-kameror på nätverket upptäcks automatiskt av Ethiris inbyggda sökfunktion. **Ethiris VMS är certifierat för ONVIF Profile S och ONVIF Profile M.**

- Ethiris hanterar alla upplösningar utan övre gräns och är testat med videoströmmar upp till **200 MPixel**.
- De tre vanligaste videokomprimeringsformaten stöds: **M-JPG, H.264 och H.265**.
- Kameror utan ONVIF- eller nativestöd kan ofta ändå anslutas via RTSP.
- ONVIF-stödet har utökats successivt: I/O via ONVIF (version 7.2), ONVIF Events (version 8), samt senare ONVIF Metadata, ljud in/ut och användarhantering.
- Passagesystem kan integreras via **ONVIF Profile C** (se [Integration med andra system](#integration-med-andra-system)).

Exempel på kameratillverkare med stöd i Ethiris: ACTi, Arecont Vision, Avigilon, Axis, Basler, Bosch, Brickcom, Canon, Dahua, D-Link, FLIR, GKB, HIK Vision, IQinVision, Panasonic, Pixord, Samsung, Sanyo, Sony och Vivotek. En aktuell och fullständig lista finns på [kentima.com](https://www.kentima.com).

## Användningsområden

Ethiris flexibla, komponentbaserade uppbyggnad gör att både användare och installatörer kan optimera funktionaliteten för det aktuella användningsområdet. Exempel från branscher där Ethiris används runt om i världen:

- **Transport och infrastruktur** – bland annat flygplatsen i Peking, där Ethiris övervakar dockningen av flygplan vid 125 gater och kommunicerar med dockningssystemet via OPC för att styra inspelningen. Andra exempel: tunnlar, hamnar, parkeringshus, lastbilscentraler och järnvägsstationer.
- **Köpcentrum och butiker** – till exempel shoppingcentret Emporia i Malmö, med cirka 130 kameror kopplade till Ethiris.
- **Offentlig miljö** – till exempel Operahuset i Oslo, övervakat med nära 100 kameror.
- **Industri- och processanläggningar** – används bland annat hos ABB och Tetra Pak, ofta sammankopplat med SCADA/PSIM-systemet WideQuick samt brand- och passagesystem. Även gruvor, tillverkande företag och processanläggningar.
- **Arenor och idrottsanläggningar** – bland annat Olympia i Helsingborg (cirka 100 kameror) och Borås Arena.
- **Sjukhus och skolor** – flera stora sjukhus och skolbyggnader, bland annat akutmottagningen på SUS i Malmö, som valde Ethiris för dess utbyggbarhet, flexibilitet och ONVIF-stöd.
- **Larmcentraler** – Helsingborgs stad använder Ethiris tillsammans med WideQuick PSIM för sin larmcentral. Safe4 larmcentral i Oslo har Ethiris Client installerad hos alla larmoperatörer för automatisk visning av relevant video vid larm.

## Livevisning

Livepanelen i Ethiris Client visar aktuell video och ljud från kamerorna i anläggningen. Normalt fördefinieras vyer med en bestämd uppsättning kameror, valbara via vyknappar i vyväljaren. Via kameralistan kan operatören också skapa temporära vyer med valfria kameror, visningsbara i huvudfönstret eller ett nytt fönster på valfri skärm, och dessa kan sparas som vyer direkt från klienten.

- **Sektioner** delar upp en anläggning i mindre, navigerbara delar (se [Sektionering](#prestanda-och-skalbarhet)), t.ex. per stad eller byggnad.
- **Kameralista/trädvy** – samtliga anslutna kameror är tillgängliga; operatören kan dra och släppa kameror till live, videospelare och videoväggsrepresentationer.
- **Instant replay** ger operatören flera chanser att se vad som hänt framför kamerorna en liten stund tidigare.
- **Flerskärmsstöd** – varje klient har stöd för upp till **åtta skärmar**.
- **Vyer** väljs via vyknappar i vyväljaren och fördefinieras i Ethiris Admin (se [Klientadministration](#klientadministration) för fullständig definition av vad en vy kan innehålla).
- **Popupfönster** är ett effektivt sätt att presentera information när något relevant händer.
- **Fjärrstyrning av klienter** möjliggör uppbyggnad av videoväggar, till exempel för en larmcentral.
- **Mobilapp** – Ethiris Mobile ger tillgång via Wi-Fi och 3G/4G/5G, med drygt 10 olika vylayouter (från 1×1 till 3×6 kameravyer) i både porträtt- och landskapsläge. I mobilkonfigurationen kan I/O-knappar skapas för att aktivera funktioner i Ethiris, t.ex. öppna en grind.

### Ethiris videovägg

Videoväggar kan visa innehåll styrt automatiskt eller manuellt av flera operatörer samtidigt, med valfritt antal monitorer och valfri layout per monitor. Konceptet består av tre delkomponenter:

- **Videoväggsobjekt** – definieras i Ethiris Servers konfiguration med namn och egenskaper (t.ex. antal monitorer). Ethiris Server håller reda på vad som visas på varje monitor och skickar ut uppdateringar (manuella eller automatiska, t.ex. vid larm) till berörda klienter.
- **Videoväggsklienter** presenterar innehållet – varje klient hanterar en eller flera videoväggsmonitorer, normalt en per fysisk skärm. Flera klienter kan dela på arbetet (t.ex. tre klienter som vardera hanterar två monitorer), och flera klienter kan spegla samma monitorer.
- **Operatörsklienter** används för manuell styrning via en lokal **videoväggsrepresentation**, där operatören kan dra och släppa kameror från kameralistan/trädet samt visa inspelad video via sin lokala videospelare. Flera operatörer kan arbeta samtidigt mot samma videovägg.

Videoväggen kan sättas som **Autonom** (ingen operatör vid videoväggsklienterna – vissa manuella funktioner döljs och muspekaren släcks). Konceptet fungerar lika bra i en stand-alone Ethiris Server som i ett Ethiris Cluster; i ett kluster sköter Master-servern videoväggen, och om Master går ner tar nästa medlemsserver över rollen. Samtliga videoväggsfunktioner är skriptbara, inklusive automatisk presentation vid larm, kundanpassade layouter och menyer.

!!! info "Licenskrav"
    Kräver en option samt licensnivå Premium eller Universal nivå 6.

### Skapa vyer i klienten

Som standard skapas all konfiguration via Ethiris Admin, av säkerhetsskäl. Operatörer i aktiv övervakning (t.ex. läktarövervakning under en match) kan dock ha behov av att skapa egna klientvyer direkt i klienten. Sådana vyer sparas lokalt för den aktuella Windows-användaren och klientkonfigurationen på den lokala datorn, läggs som vyknappar efter de fördefinierade, och kan raderas manuellt via högerklick. Vyerna är kopplade till just den Windows-användaren och den klientdatorn – en annan användare eller dator ser dem inte.

!!! info "Licenskrav"
    Tillgängligt från licensnivå Extended eller Universal nivå 3.

## Adaptiva videoströmmar

Adaptiva videoströmmar anpassar sig efter rådande hårdvaruförhållanden i Ethiris Client eller Ethiris Mobile för att maximera prestanda vid livevisning. Flera videoströmmar med olika upplösning kan definieras per kamera; när en klient visar många kameror samtidigt väljs automatiskt en lägre upplösning för att minska belastningen.

**Exempel:** En 4K-kamera (3 840 × 2 160 px) kan ha tre definierade videoströmmar – Primary (4K), Medium (Full HD, 1 920 × 1 080 px) och Mini (VGA, 640 × 480 px). Visar en 4K-skärm fyra samtidiga kameror (varje kameravy 1 920×1 080 px) väljs automatiskt Medium-strömmen istället för att tvinga fram fyra fulla 4K-strömmar.

Klientinställningen styr hur strömmen väljs i förhållande till kameravyns storlek:

- **Ingen** – primärströmmen väljs alltid, oavsett kameravyns storlek (motsvarar äldre Ethiris-versioners beteende).
- **Prestanda** – väljer strömmen med samma eller närmast lägre upplösning än kameravyn.
- **Kvalitet** (standard) – väljer strömmen med samma eller närmast matchande upplösning (över eller under).

Byte av videoström sker automatiskt och sömlöst vid ändrad kameravystorlek, alltid på en Key-frame i den nya strömmen. Vid digital inzoomning skickas alltid Primary-strömmen för maximal kvalitet.

**Larminspelning:** Via skript kan man styra vilken videoström som ska användas vid en given tidpunkt – t.ex. lägre upplösning/bildfrekvens under normal drift och högre vid ett allvarligt larm, med sömlöst byte på nästa Key-frame. Prealarmtiden ställs in per kamera under fliken Inspelning i Ethiris Admin – t.ex. ger 30 sekunders prealarm 30 sekunder högupplöst video redan innan larmet utlöstes.

**Sekretess:** Man kan begränsa vilka videoströmmar som får visas i Live via kolumnen "Live" i Ethiris Admin. Används t.ex. tillsammans med kameror som stöder Privacy Mask (t.ex. Axis Privacy Shield): en omaskad ström döljs i Live medan en maskad ström tillåts, och behörighet kan krävas för att titta på den inspelade omaskade videon.

## Visning av inspelad video

Videospelaren i Ethiris Client visar inspelad video och ljud, och består av kameravyer och tidslinjer. Upp till **64 samtidiga kameror** kan visas synkront, med tidsspann i tidslinjerna från en minut till sex månader.

- **Videopanel** – standardfunktioner för uppspelning framåt/bakåt, bild-för-bild, segment-för-segment, snabbspolning, variabel hastighet, samt möjlighet att ange en exakt tidpunkt.
- **Tidslinjal** – markerar aktuell tidpunkt; dra i den för att snabbspola, eller ta tag i tidsmarkeringsområdet för att flytta hela tidsintervallet.
- **Zoomning** – fasta intervall från tio minuter till en månad, samt grafisk zoomning genom att markera önskat område.
- **Loggad data** – historikloggade signalvärden (t.ex. ett kollinummer eller maskinstatus) kan visas tillsammans med inspelad video.

### Tidslinjer – färgkodning

Grundfärgerna i tidslinjerna är:

- Rött – händelsestyrd inspelning
- Blått – kontinuerlig inspelning
- Mörkgrått – video som spelats in men sedan raderats enligt tidsinställningarna

Från version 12.0 kan den röda färgen delas upp i fler, mer specifika färger som visar *vad* som startade en händelsestyrd inspelning, med kompletterande verktygstips vid hovring. Funktionen kan slås av, varvid alla händelsestyrda inspelningar återgår till att visas enfärgat i rött som tidigare:

| Färg | Betydelse |
|---|---|
| Grön | Manuell inspelning via inspelningsknapp i klienten |
| Orange | Händelseinspelning enligt inspelningspanelen i Ethiris Admin |
| Gul | Inspelning för kamera associerad med larm eller händelse |
| Lila | Händelseinspelning via FTP |
| Röd | Övriga händelseinspelningar som inte täcks av ovanstående, t.ex. via skript |

Som alternativ till en tidslinje per kamera kan en **summalinje** visas längst ner i panelen, som summerar inspelningar från samtliga kameror och därmed frigör plats för fler kameravyer.

### Minivideospelare

Kan visas direkt i en kameravy i live, för att effektivisera operatörens arbete. Via popupmenyn eller en knapp i kontrollpanelen växlar man mellan live och inspelat för en kamera – ett blinkande "R" i vyns hörn indikerar minivideospelarläge. Stödjer navigering mellan videosegment, bildstegning, uppspelning framåt/bakåt, samt återgång till livevy.

### Smart sökning

Utöver manuell sökning i tidslinjerna finns:

- **Synkning med händelse och larm** – dubbelklick på en händelse eller ett larm i listan laddar automatiskt videospelaren med associerade kameror och rätt tidpunkt.
- **Smart search** – detekterar rörelse i ett eller flera markerade områden av bilden; första matchande bilden visas och tidslinjerna rullas fram automatiskt.

## Export

Video och ljud kan exporteras för vidare distribution, exempelvis till polisen. Export utgår alltid från tidsintervallet i tidslinjerna – hela intervallet eller en enskild inspelning (t.ex. via högerklick på ett segment och "Exportera").

- **Exportdialog** – tidsgränser, exportformat, målkatalog, vilka kameror som ska ingå, samt om kameranamn/tidsstämpel ska visas.
- **Ethiris nativeformat** (förvalt, sedan version 7) – bibehåller originalkvaliteten och exporterar upp till **1 000 gånger snabbare** än andra format. Spelas upp i Ethiris Viewer, som stödjer synkroniserad uppspelning av upp till nio filer.
- **Signering** – exporten signeras digitalt för att förhindra manipulering och säkerställa bildernas äkthet.
- **AVI** – kan exporteras direkt, spelbart i vanlig Windows-mediaspelare, från både Ethiris Client och Ethiris Viewer.
- **Stand-alone** – Ethiris Viewer kräver ingen installation, bara .NET 4.0 eller senare (förinstallerat i t.ex. Windows 11).

### Automatisk export av video

Via skript kan video från valda kameror och tidsintervall exporteras automatiskt, så att viktigt material inte glöms bort. Inspelat ljud och loggade variabelvärden kan följa med exporten. Funktionen bygger på skriptklassen `ExportJob` med metoder/egenskaper/händelser som `Start()`, `Abort()`, `onProgress`, `onFinished` och `onError`. Egenskapen `MaxFileSize` styr maximal filstorlek per exportfil (ryms inte exporten skapas flera filer automatiskt, som Ethiris Viewer spelar upp i följd).

!!! info "Licenskrav"
    Kräver en separat option samt licensnivå Premium eller Universal nivå 6.

## Joystick, Keypad och Jog dial

Ethiris VMS har inbyggt stöd för joystick, knappsats (keypad) och jog-ratt (jog dial), med fullt stöd för Axis senaste enheter inom området. Konfiguration sker i Ethiris Admin, där Ethiris läser in aktuell utformning av ansluten hårdvara (tillgängliga knappar) som sedan kan kopplas till funktioner, t.ex. styrning av videospelaren. En joystick kan ha upp till 128 knappfunktioner beroende på ansluten enhet. Ethiris stödjer bland annat Axis keypad-enheterna TU9002/TU9003, T8312 samt jog-ratten T8313 (styr uppspelningshastighet och bildstegning).

## Ethiris Viewer

Fristående mjukvara för uppspelning av filer i Ethiris eget exportformat (se [Export](#export) för formatets egenskaper). Version 13.2 byggde om uppspelningsmotorn för smidig samtidig uppspelning av flera högupplösta kameror (4K/8 MPixel, 360-kameror ofta 12 MPixel) och lade till uppspelning baklänges (`Shift+Mellanslag`). Kameravyer kan dras ut till separata fönster (`Shift` + dra) och placeras på valfri skärm, fortfarande synkroniserat.

## 360-kameror

Dewarpingfunktionen gör att 360-kameror kan användas fullt ut – kameran skickar alltid den kompletta 360-bilden som en enda videoström (och använder bara en kameralicens), och det är Ethiris Client som dewarpar bilden i live, videospelaren och Instant Replay. Fungerar generellt med 360-kameror från olika tillverkare, men är i första hand utvecklad för kameror med ImmerVision-linser. Zoom/panorering fungerar som för en vanlig PTZ-kamera.

**Dewarp-lägen** (väljs via högerklick i bilden):

- **PTZ-vy** – en vy som kan zoomas, panoreras och tiltas.
- **Panoramavy** – täcker hela 360° runt kameran, passar bäst vid höjd-bredd-förhållande 1:7,5.
- **Panoramavy, fast bildförhållande** – som panoramavy, men förhållandet sätts automatiskt.
- **Fyrsplitsvy** – fyra vyer som var och en kan zoomas, panoreras och tiltas separat.
- **Dubbel panoramavy** – två vyer som vardera täcker 180°.
- **Dubbel panoramavy, fast bildförhållande** – som dubbel panoramavy, med automatiskt satt förhållande.

**Virtuella kameror** fördefinierar ett visst dewarp- och PTZ-läge (eller zoomläge för en digitalt zoomad kamera) och används i Ethiris Client precis som vilken annan kamera som helst, t.ex. i fördefinierade klientvyer. Kan inte skapas för en fysisk PTZ-kamera. Flera virtuella kameror kan skapas per fysisk kamera, men de räknas mot det totala antalet kameralicenser – maximalt antal logiska kameror (fysiska + virtuella) är två gånger antalet tillgängliga kameralicenser.

## Larmhantering

Larmlistan visar samtliga aktiva larm och indikeras i alla anslutna klienter. Larm kan associeras med en eller flera kameror för automatisk inspelning och enklare videosökning, och varje statusändring (aktiverat, kvitterat, åtgärdat, av vem och från vilken dator) loggas i händelselistan.

- **Sortering och färgkodning** – larmlistan kan sorteras på status, tid, larmgrupp, allvarlighet och larmtext (standard: status, sedan fallande tid), med färgkodning per larmgrupp.
- **Systemlarm** – automatiskt definierade, t.ex. kommunikationsfel med kamera, full lagringsenhet, otillräcklig diskkapacitet eller skriptfel. Prioritet kan sättas per larm.
- **Egendefinierade larm** – valfria aktiveringsvillkor och kameraassociation. En "Maximal längd" kan begränsa hur länge inspelning fortgår även om villkoret kvarstår.
- **Summalarm** per larmgrupp – `SumAlarm` (aktivt tills alla larm i gruppen både återställts och kvitterats) och `SumAlarmActiveUnacked` (aktivt bara medan något larm är aktivt och okvitterat).
- **Larmfilter** – kräver ett visst antal triggningar inom ett tidsfönster, eller att en triggning varit aktiv en viss tid, innan larmet faktiskt aktiveras – minskar falsklarm utan att behöva skriva skript.
- **Ethiris Mobile** – larm kan kvitteras direkt från mobilen, med varningstriangel och detaljvy.

### Larmcentraler

Ethiris kan skicka larm och händelser till larmcentraler via **SIA-koder** – det protokoll som de flesta larmcentraler använder för att ta emot, fördela och presentera larm för sina operatörer. Ett exempel är larmcentralen Safe4, som har Ethiris Client installerad lokalt hos alla sina operatörer: när ett larm kommer in från en ansluten anläggning kan larmoperatören automatiskt få upp live och inspelad video från de kameror hos kunden som är associerade med larmet. All information som Ethiris Client i larmcentralen behöver för att koppla upp sig mot kundens Ethiris Server och hämta video skickas krypterad i SIA-meddelandet som Ethiris Server skickar vid larm.

### Larmoperatörsfunktioner

Från version 12.0 finns en särskild kvitteringstyp, "Larmoperatör", som gör att bara en larmoperatör i taget hanterar ett givet larm. En knapp används för att "ta" larmet, varvid det försvinner från övriga operatörers larmlistor; en tvåsplittvy visas då automatiskt med en minivideospelare och live från den associerade kameran. Två separata behörighetsprivilegier styr åtkomst: ett för operatörer (ser bara sina egna larm) och ett för administratörer (ser alla larm, inklusive de som blivit liggande hos en frånvarande operatör). Larmlistan i Ethiris Client kan växlas mellan traditionellt läge och larmoperatörsläge.

### Kontroll över händelser

Händelselistan visar samtliga händelser i systemet (systemhändelser, egendefinierade händelser och larmstatusändringar) och fungerar som historiklogg. Händelser kan associeras med kameror för direkt åtkomst till relevant video via dubbelklick. **Spårning (Audit trail)** kan aktiveras per funktion (t.ex. "Visa livevideo från kamera") och loggar vad, vem, när och från vilken dator – med möjlighet till automatisk radering efter en inställbar tid.

## Ljud

Ljudfunktionen ger operatören möjlighet att tala ut till en eller flera högtalarenheter i anläggningen, samt att lyssna live och spela in ljud från kameror med mikrofon.

**Ljud ut:** Stöds via högtalare inbyggd i eller kopplad till en ONVIF- eller Axis-kamera, eller en ren IP-högtalare från Axis (t.ex. C3003). Ljudknappar kan definieras i klientkonfigurationen och kopplas till en eller flera högtalarenheter; aktivt tal indikeras med en blinkande mikrofonsymbol.

**Ljud in** (från version 12.0): live-lyssning och inspelning av ljud från kameror med mikrofon, med stöd för export till Ethiris nativeformat och uppspelning med ljud i Ethiris Viewer. Kräver kamerastöd för ONVIF, Axis eller Kentimas simulatorkameror, samt ljudformat G711. Variablerna `EnableAudio` och `EnableListen` styr om ljud in är tillåtet respektive om live-lyssning är tillåten (inspelning kan fortsätta fungera även om live-lyssning stängs av). Tre separata användaroperationer styr behörighet: lyssna på ljud live, lyssna på inspelat ljud, samt exportera ljud.

### Porttelefonsfunktioner

Interaktionsobjektet "Telefonknapp" (se även [Översiktsbilder](#oversiktsbilder)) möjliggör en porttelefonsfunktion tillsammans med en ljudkapabel kamera. Ett klick aktiverar ljud in och ljud ut i kameran för tvåvägskommunikation mellan operatör och besökare – till exempel triggat av en digital ingång kopplad till en ringklocka, som öppnar ett popupfönster med kameravy och en "Svara"-knapp hos operatören.

## Skript och skriptbibliotek

Utöver den automatiska inspelning som konfigurationsguiden sätter upp (rörelsedetektering och scheman) erbjuder skriptfunktionen ett kraftfullt verktyg för att skräddarsy systemets beteende. Inställningar från kamerainspelningspanelen kan konverteras direkt till skript som utgångspunkt. Objekt i Ethiris Server (kameror, scheman, rörelsedetekteringar) får automatiskt kopplade variabler som kan användas i skript – en PTZ-kamera får t.ex. läs- och skrivbara variabler för pan/tilt/zoom.

Skripteditorn har Intellisense (kontextberoende förslag), bokmärken (`Ctrl+B` m.fl. för att navigera i stora skript), en dokumentöversikt, en **Watch-panel** för att se och redigera variabelvärden i realtid, samt ett debugfönster för felsökning.

### Skriptbibliotek

Skriptbibliotek strukturerar och återanvänder skriptkod. Kentima tillhandahåller ett antal färdiga, testade och dokumenterade bibliotek som importeras via noden **Skriptbibliotek** under **Logik** i Ethiris Admin (från fil eller zip). Bibliotek körs automatiskt en gång vid start av Ethiris Server, i den ordning de ligger i trädet – ett bibliotek som använder funktioner från ett annat måste därför ligga efter det i listan.

!!! info "Licenskrav"
    Skriptbibliotek kräver licensnivå Advanced eller Universal nivå 4.

De medföljande biblioteken:

| Bibliotek | Funktion |
|---|---|
| **scExtensions** | Utökningar av skriptmotorn: strängdelning, medelvärdesberäkning (`calculateAverage`), samt `FindAllAlarms` för att hitta alla larmobjekt i konfigurationen. Grund för flera av de övriga biblioteken. |
| **scFile** | Läser och skriver filer, t.ex. för loggning. |
| **scSaveImage** | Sparar stillbilder från valda kameror med givet tidsintervall, helt självständigt. |
| **scMail** | Skickar e-post vid larm, med filtrering på allvarlighetsgrad. |
| **scCameras** | Hämtar information om konfigurerade kameror (händelsestyrt eller cykliskt), t.ex. för att övervaka bandbredd. |
| **scSunRiseSet** | Beräknar soluppgång/solnedgång för valt datum och plats. |
| **scSNMP** | Kommunicerar med en NAS (testat mot Synology RS1219+) via SNMP, t.ex. för att läsa diskstatus. |
| **scExportVideo** | Förenklar automatisk export av video från kameror associerade med larm. |

## Integration med andra system

Ethiris har flera standardiserade sätt att kommunicera med andra system, vilket förenklar integration i större anläggningar:

- **OPC** – en OPC-klient ingår i Ethiris Server, och en separat Ethiris Server OPC Server (se [Komponenter i ett Ethiris-system](#komponenter-i-ett-ethiris-system)) gör att andra system kan ansluta mot Ethiris Server. Exempel: en kortdragning i ett passagesystem startar via OPC en inspelning på förvalda kameror; en branddetektor styr en PTZ-kamera till en förvald position och öppnar ett livefönster hos larmcentralen.
- **ONVIF Profile C (passage)** – plug-in-koncept för passagesystem, från version 7. Ethiris Admin söker automatiskt efter dörrkontroller på nätverket och läser in konfigurationen. Larm och varningar (t.ex. "Door forced open") kan associeras med kameror för automatisk händelsestyrd inspelning.
- **Databas (ODBC)** – Ethiris kan både läsa och skriva information till/från databaser, t.ex. logga registreringsnummer inlästa via en LPR-kamera.
- **Ethiris ActiveX** – visar livebilder från valfri kamera i vilket system som helst med stöd för ActiveX-kontroller, t.ex. HMI/SCADA/PSIM-mjukvara, kassasystem eller Microsoft Office.

### .Net plug-in

Möjliggör import av valfria .Net SDK:er direkt i Ethiris skriptmotor, så att klasser och funktioner i SDK:et blir tillgängliga från Ethiris-skript med hjälp av Intellisense. SDK:et levereras som en dll som placeras i katalogen `ScriptPluginAssemblies` i Ethiris Servers installationskatalog; Ethiris Server måste startas om för att ladda dll:en och Ethiris Admin för att uppdatera Intellisense.

!!! info "Licenskrav"
    Kräver licensnivå Premium samt option för .Net Plug-in.

### Ethiris SDK

Ethiris SDK möjliggör djup integration mot Ethiris VMS från andra system – i princip all videofunktionalitet i Ethiris VMS är tillgänglig via SDK:et. Riktar sig i första hand till systemutvecklare som behöver implementera videofunktionalitet i egna system, t.ex. för att visa livevideo när ett passagesystem detekterar ett ogiltigt kort. Stödjer utveckling för både **Windows Forms** och **Windows Presentation Foundation (WPF)**.

Funktioner via SDK:et inkluderar: inloggning (inklusive OAuth-token för automatisk inloggning utan manuell OTP), visning av live- och inspelad video (med uppspelning framåt/bakåt i olika hastigheter samt bildstegning), synkroniserad uppspelning av flera kameror via `ViewerControl`, full PTZ-styrning (inklusive förinställda positioner), läsning/skrivning av I/O-variabler (Boolean, Integer, Double, String), ljud in/ut, export till Ethiris nativeformat för upp till 9 kameror samtidigt, samt fullt stöd för 360-kameror (PTZ och dewarping).

!!! info "Licenskrav"
    Kräver licensnivå Premium eller Universal nivå 6, samt optionen Ethiris SDK.

Ett demoexempel i C# (.Net) medföljer installationen under Samples, och kan köras direkt eller kompileras i Visual Studio. Fullständig dokumentation av gränssnittet finns i den separata manualen "Integration mot Ethiris SDK".

### Videoanalys

Utöver inbyggd rörelse- och vandaldetektering (oberoende av kameramodell) kan Ethiris ta emot mer avancerad videoanalys från moderna kameror (LPR/nummerplåtsavläsning, objektsdetektering och -klassificering, linjepassering, personräknare, lämnade objekt, loitering) via tre huvudsakliga metoder:

- **TCP/http-lyssnare** – kameran skickar notifieringar vid triggning.
- **ONVIF Events** – notifieringar från kameran presenteras som variabler i Ethiris, direkt användbara i skript.
- **ONVIF Metadata** – öppnar för mer avancerad analys; kräver att kolumnen "M" (metadata) markeras för kameran i Ethiris Admin.

### WideQuick PSIM

Genom att kombinera Ethiris med **WideQuick PSIM** (Kentimas SCADA/PSIM-system) kan systemintegratören skapa en överordnad säkerhetsplattform, med OPC och Modbus för integration av t.ex. passagesystem, brandlarm och inbrottslarm. WideQuick används som överordnat system inom bland annat infrastruktur, köpcentrum, arenor, larmcentraler samt övervakning av flygplatser och städer. Komponenterna omfattar WideQuick Designer (utvecklingsverktyg), WideQuick Runtime (drifttid), WideQuick Remote (fjärrstyrning) och WideQuick Web Client (webbaserad åtkomst utan plug-ins).

## Övriga funktioner

- **Schema** – fritt definierbara vecko- och dygnsbaserade scheman för att styra aktiviteter, t.ex. kombinerat med rörelsedetektering.
- **Rörelsedetektering** – inbyggd för alla anslutna kameror, med flera definitioner per kamera (yta, känslighet) och en brusreduceringsalgoritm i 9 steg.
- **E-post och sms** – automatiska meddelanden kopplade till händelser, t.ex. sms till jourhavande personal vid kommunikationsfel med en kamera.
- **UPS-stöd** – Ethiris kan läsa UPS-status (direkt eller via NAS) och stänga ner kontrollerat vid låg batterinivå för att undvika korrupt videodata.
- **Automatisk kamerasökning** – kameror med UPnP eller ONVIF hittas automatiskt, utan manuell inmatning av tillverkare, modell och IP-adress.
- **Klienthändelser i skript** – fyra händelser kan detekteras från klienten och användas i skript: `onButtonPressed`, `onViewClicked`, `onPlayerLoaded` och `onPlayerTime`.
- **Fullskärmsläge** – en klientkonfiguration kan låsas till fullskärm, eller väljas manuellt av operatören (`F11`).
- **Språkstöd** – administrationsverktyget, klienten och de mobila applikationerna stödjer flera språk, med kontinuerligt tillkommande språk efter marknadens önskemål. Språket kan enkelt bytas när som helst via menyn.

## Serveradministration

**Ethiris Admin** är det gemensamma verktyget för att konfigurera alla delar av ett Ethiris-system, med möjlighet att vara uppkopplad mot flera Ethiris Server samtidigt.

- **Kamerakonfiguration** – kameror läggs enkelt in via sökfunktionen i panelen Kameror, som automatiskt identifierar tillverkare, modell och IP-adress. Format (M-JPG, MPEG-4, H.264 eller H.265), upplösning, bildfrekvens, komprimering, kvalitet och rotation kan konfigureras direkt.
- **Kameragrupper** – ger bättre överblick och effektiv administration av stora system, med grupper i grupper och automatiskt skapade variabler per grupp för användning i skript.
- **Sortering och filtrering** – kameralistan kan sorteras och filtreras på flera fält samtidigt (flera sökord separerade med `|`), med antal träffar visat direkt i panelen.
- **Multiuppdatering** – flera kameror kan markeras samtidigt och få samma värde ändrat i en enda operation.
- **Ethiris Cluster** skapas genom att högerklicka på en Ethiris Server i Ethiris Admin och välja "Skapa kluster"; konfigurationen delas därefter automatiskt mellan medlemsservrarna.
- **Optimerad laddning** – varje server laddas parallellt i trädvyn, och detaljerad information (t.ex. rörelsedetekteringar, PTZ) laddas först när man klickar på kameran.
- **Onlineuppdatering** – vissa ändringar (kamerainställningar, skript, behörigheter) kan sparas utan att Ethiris Server går offline eller stoppar pågående inspelning. Andra ändringar kräver en fullständig uppdatering med en kort offline-period.
- **Statistik** – statistikpanelen visar aktuellt bildformat, upplösning, bandbredd och mängd inspelning per timme och kamera. Inspelningsstatistiken visar lagrat material per lagringsenhet; från licensnivå Advanced/Premium kan en server lagra mot flera lagringsenheter samtidigt.
- **Historikloggning** – variabelvärden (från externa givare, andra system eller interna variabler) kan spelas in tillsammans med video och exporteras tillsammans med den, t.ex. till en AVI-fil.
- **OPC-browser** – presenterar tillgängliga signaler i ett annat OPC-kompatibelt system för direkt inval i Ethiris Servers datalager, med automatisk ömsesidig uppdatering.

### Automatisk tidsjustering

Ethiris VMS synkar automatiskt tiden i alla anslutna ONVIF-kameror, och samtliga Ethiris Client synkar sin klocka mot en Ethiris Server. Ethiris Server ställer även in kamerornas NTP-server att peka mot sig själv, och har en egen inbyggd NTP-server alltid aktiverad. Det rekommenderas att synka Ethiris Servers klocka mot en extern NTP-server. Ett larm genereras automatiskt om tidsskillnaden mellan två Ethiris-enheter (klient eller server) överstiger 30 sekunder.

### Multipla instanser av Ethiris Server

Flera instanser av Ethiris Server kan köras på samma dator, isolerade från varandra – särskilt användbart vid hosting där flera kunder delar hårdvara. Varje instans kör i en egen arbetskatalog och har egen lagringsplats för video, och visas separat i listan över tillgängliga Ethiris-servrar. En kryssruta kan begränsa vad som kan ändras för en instans vid distansanslutning, för att skydda övriga kunder på samma hårdvara (t.ex. hindra ändring av portar eller lagringskonfiguration).

!!! info "Licenskrav"
    Kräver Universal-licens nivå 6. Max 30 instanser av Ethiris Server per Windows-server.

## Klientadministration

Ethiris Client kan konfigureras flexibelt för en effektiv operatörsmiljö.

- **Vyer** – upp till 8×8 kameravyer per vy, fritt antal rader/kolumner eller fördefinierade layoutmallar. En vy består av 1–64 kameravyer som kan visa live, hotspot, rondering, bakgrundsbild eller webbsida.
- **Sektioner** – klientkonfigurationen kan delas in i sektioner med önskat djup (med undersektioner, se [Sektionering](#prestanda-och-skalbarhet)) för överskådlighet, oftast med egna vyer och knappar.
- **Interaktionsobjekt** i kameravyer ger information eller styrning: knapp, lysdiod, kamerasymbol, text, bild, dörrobjekt och telefonobjekt.
- **Behörighet per konfiguration** – eftersom klientkonfigurationer hanteras centralt av Ethiris Server kan behörighetskrav sättas per konfiguration, kopplat till en användargrupp.
- **Hotspot** – styr vilka livebilder som visas i en kameravy, manuellt eller automatiskt via en variabel.
- **Rondering** – en kameravy kan automatiskt växla mellan flera kameror, vanligt t.ex. vid en kassa.
- **Popupfönster** – fördefinierade fönster med given storlek/position, refererbara från andra funktioner.
- **Uppstartsinställningar** – styr fönsterstorlek/position/läge, synliga paneler och meny, samt vilka vyer/popupfönster som visas från start på alla anslutna skärmar.

### Översiktsbilder

Interaktionsobjekt kan läggas ovanpå livebilder, översiktsbilder eller kartor, både som information och styrverktyg – till exempel en stor karta på en skärm som styr vilka livebilder som visas på andra skärmar.

| Objekt | Funktion |
|---|---|
| **Lysdiod** | Visar status för en digital signal, t.ex. rörelse, dörrstatus eller aktivt larm. |
| **Knapp** | Styr en skrivbar digital signal, t.ex. öppna en grind, styra PTZ eller visa en specifik livebild. |
| **Kamera** | Representerar en kamera; klick visar livebilder i en förkonfigurerad kameravy. |
| **Textfält** | Visar fast text eller innehållet i en variabel, t.ex. ett kollinummer. |
| **Bild** | Visar statiska bilder, kan kopplas till en boolesk variabel för att styra synlighet. |
| **Dörr** | Representerar en dörrenhet kopplad via passagesystem-plugin; visar status (stängd, låst, öppen, forcerad) och kan låsas upp manuellt. |
| **Telefon** | Upprättar tvåvägskommunikation mellan operatör och besökare, se [Porttelefonsfunktioner](#porttelefonsfunktioner). |

## Behörighet och säkerhet

Ethiris har ett eget behörighetssystem med användare och grupper, och kan även integreras med Windows behörighetssystem (Active Directory, en domän, eller den lokala servern). Cirka 20 Ethiris-funktioner kan kopplas till användargrupper, och all användning kan spåras och loggas i händelselistan med tidpunkt och användare. Behörighet kan sättas på servernivå eller specifikt per kamera/klienttyp (Ethiris Admin, Ethiris Client, Ethiris Mobile, WideQuick Ethiris View) – till exempel kräva inloggning för mobilanslutning men inte för lokal nätverksanslutning.

**Single Sign On (SSO)** loggar automatiskt in med den Windows-användare som redan är inloggad, förutsatt att både server- och klientdatorn är medlemmar i samma domän.

**2FA (tvåfaktorsautentisering)** kräver, utöver användarnamn och lösenord, en engångskod från en autentiseringsapp (t.ex. Microsoft Authenticator), aktiverad via en QR-kod vid första inloggningen.

**Lösenordssäkerhet** – administratören kan sätta minsta lösenordsstyrka (sex nivåer, Mycket svag–Extremt stark) eller skräddarsy komplexitetskrav (minsta längd och teckentyper), kräva lösenordsbyte vid första inloggning, sätta en max lösenordsålder (standard 180 dagar om aktiverad), samt aktivera kontolåsning (5 felaktiga försök låser kontot i 15 minuter, med 15 minuter till per ytterligare misslyckat försök).

**Kryptering** – Ethiris stödjer full kryptering i kommunikationen mellan systemets komponenter (t.ex. mellan Ethiris Server, Ethiris Client och Ethiris Mobile), samt krypterad kommunikation mot kameror som stödjer https. Kryptering av video- och datafiler på disk kräver licensnivå Premium.

!!! info "Licenskrav"
    Single Sign On och 2FA kräver licensnivå Premium eller Universal nivå 6.

## NVR, NVC och NVP

Utöver mjukvaran Ethiris tillverkar Kentima även dedikerad hårdvara som Ethiris kan köras på. Samtliga Ethiris NVR-, NVC- och NVP-modeller är tillförlitliga, robusta datorer med Ethiris VMS förinstallerad och licensierad, utvecklade och testade av Kentima. Samtliga modeller har en 120 GB SSD där operativsystem och Ethiris VMS ligger förinstallerade.

| Produkt | Beskrivning | Max antal kameror | Max intern videolagring |
|---|---|---|---|
| **Ethiris NVR-1E** | För mindre, enklare anläggningar. | 32 | 22 TB |
| **Ethiris NVR-4** | Hög prestanda, Intel i3/i5/i7. För större och mer krävande anläggningar. | 200 | 44 TB |
| **Ethiris NVRN-2 / NVRN-3 / NVRN-4** | Kör Ethiris Server med extern videolagring mot en NAS – ingen plats för interna videolagringsdiskar. NVRN-4 har samma prestanda som NVR-4 och utgör basen i Ethiris NVRN Rack Solutions. | 200 (NVRN-4) | – (extern NAS) |
| **Ethiris NVRC-4** | Kör Ethiris Server och Ethiris Client samtidigt på en och samma dator. | 100 | 22 TB |
| **Ethiris NVC-4S** | Renodlad klientdator med Ethiris Client förinstallerad, ingen videodisk. Upp till 3 skärmar. | – | – |
| **Ethiris NVC-4L** | Renodlad klientdator med Ethiris Client förinstallerad, ingen videodisk. Upp till 4 skärmar. | – | – |

**Ethiris NVP – touchpaneler:**

- **NVP-300-serien** – NVP-1E-311 (10,1" touchskärm) och NVP-E316 (15,6" touchskärm), för utanpåliggande montage på vägg eller arm, levereras med VESA-fäste.
- **NVP-500-serien** – NVP-1E-516 (15,6" touchmonitor), infälld montering i vägg eller skåp med väggtjocklek upp till 10 mm.
- **NVP-600-serien** – NVP-4-616 (15,6") och NVP-4-621 (21,5") touchmonitorer med Intel i3/i5/i7, lämpade för visning av upp till 100 samtidiga kameror i Full HD med 25 fps. Infälld montering i vägg eller skåp med väggtjocklek upp till 10 mm.

Flera NVR-enheter kan samverka för att hantera ett stort antal kameror i samma anläggning, och samtliga modeller kan ingå i ett Ethiris Cluster för redundans.

## NVRN Rack Solutions

NVRN Rack Solutions är Kentimas färdigbyggda, rackbaserade hårdvarulösningar med Ethiris förinstallerat och färdigkonfigurerat. Racklösningarna finns i tre grundserier – Small, Medium och Large – för att täcka olika anläggningsstorlekar. Grundtanken är att racklösningen ska tillhandahålla allt som behövs i en videoövervakningsanläggning förutom själva kamerorna; diskarna ingår inte i grundpriset utan beställs separat efter behov. Diskkapaciteten i tabellen nedan visar vad respektive serie maximalt kan bestyckas med, inte en standardkonfiguration.

Basen är Ethiris NVRN. Samtliga ingående NVRN har licensnivå **Premium** inklusive 5 års fria uppdateringar och konfigureras i ett **Ethiris Cluster** – om en eller flera NVR faller ifrån tar övriga automatiskt över hanteringen av dess kameror. Kentima monterar NVR:erna i racket tillsammans med switch, NAS, strömförsörjning och UPS, och konfigurerar IP-adresser och nätverksinställningar enligt kundens önskemål. Montering, konfiguration och testning av hela systemet ingår innan leverans.

| | Serie S (Small) | Serie M (Medium) | Serie L (Large) |
|---|---|---|---|
| Antal kameror | 32–64 | 64–300 | 128–2 000 |
| Diskkapacitet RAID 5 | 140 TiB (8 diskar) | 220 TiB (12 diskar) | 940 TiB (48 diskar) |
| Höjd på rackskåp | 12 U / 635 mm | 18 U / 902 mm | 32 U / 1 610 mm |

## Ethiris Monitor – övervakning av hårdvara

Ethiris Monitor är en separat process som installeras tillsammans med Ethiris Server och Ethiris Client. Syftet är att övervaka den Ethiris NVR-, NVC- eller NVP-enhet som Ethiris VMS körs på, för att i god tid upptäcka problem och öka driftsäkerheten. Processen identifierar automatiskt vilken hårdvara enheten består av och skapar motsvarande variabler och larm i datalagret.

- **Moderkort** – två temperaturer och upp till tre fläktar övervakas, med automatiska larm vid för hög temperatur respektive för lågt fläktvarvtal.
- **Processorer** – grundläggande information hämtas oavsett hårdvara, men fläktar/temperaturer övervakas bara i Kentimas NVX-datorer. Temperatur läses per kärna, men ett gemensamt larm (`CoreTempTooHigh`) skapas per processor.
- **Grafikkort** – två temperaturlarm och ett fläktlarm, samt variabler för dataöverföringshastigheter.
- **Diskar** – grundinformation (namn, serienummer), larm för hög temperatur samt diskreta värden för drifttimmar och antal start/stopp.

Diskreta sensorvärden nås ett steg ned i trädet (noden **Sensors**) och kan användas för egna larmgränser eller historikloggning, t.ex. ett egendefinierat larm som aktiveras om en temperatur överstiger 35 °C.

!!! info "Licenskrav och kompatibilitet"
    Kräver minst licensnivå Extended eller Universal nivå 3. NVX-serierna 1E, 2, 3 och 4 stöds (Serie 4 kräver Ethiris VMS 17.0 eller senare).

### Ethiris Monitoring Dashboard (EMD)

EMD är en WideQuick-applikation som övervakar utrustningen i en Ethiris NVRN Rack Solution (eller annat Ethiris-system) – typiskt en hel racklösning med flera Ethiris NVRN, switch, NAS och UPS. EMD kan köras som webbapplikation och är därmed tillgänglig på distans via webbläsare eller mobil enhet, eller lokalt i en operatörsklient monterad direkt i racket för snabb översikt på plats. Via statistikvariabler från Ethiris Server visas bland annat nätverksbandbredd, videolagringsprestanda och UPS-data, samt status för de fyra LED-indikatorerna på varje NVR.

Se den dedikerade lösningssidan för [Ethiris Monitoring Dashboard](../losningar/ethiris-monitoring-dashboard/oversikt.md) för installations- och konfigurationsguider.

### SNMP – diskövervakning på NAS

I rackbaserade lösningar med RAID-lagring (RAID-5 tål en trasig disk, RAID-6 två) kan diskproblem döljas av RAID-systemet så länge det fortfarande fungerar. Skriptobjektet **SNMPReader** läser status via SNMPv1 direkt från NAS-enheten (testat mot Synology RS1219+) eller annan nätverksutrustning, för att kunna larma vid avvikande diskstatus trots att RAID-systemet i sig fungerar.

## Ethiris Access Service (EAS)

EAS är en optimerad DNS-tjänst från Kentima, inbyggd i Ethiris Server, Ethiris Client och Ethiris Mobile från version 13.0. Syftet är att underlätta anslutning över internet mot en Ethiris Server som saknar fast publik IP-adress. Vid prenumeration väljs ett unikt DNS-namn; om serverns IP-adress ändras hanterar Ethiris detta automatiskt så att klienter fortsätter nå rätt adress via DNS-namnet.

EAS finns tillgängligt för alla licensnivåer (Free–Universal) men kräver en beställd prenumeration, som faktureras kvartalsvis i förskott och kan sägas upp när som helst.

## Läs vidare

- **[Manual](manual/index.md)** – fördjupad handbok för Ethiris VMS.
- **[Knowledge base](knowledge-base/index.md)** – lösningar på vanliga frågor och problem.
- **[Kamerastöd per version](kamerastod/index.md)** – detaljerad kompatibilitetslista per Ethiris-version.
- **[Versionsnyheter](versionsnyheter/index.md)** – vad som är nytt i respektive Ethiris-version.

---

*Sammanfattat från Kentimas produktbroschyrer "Produkter för professionell videoövervakning" och "Ethiris Video Management Software – Produktinformation" (version 17).*
