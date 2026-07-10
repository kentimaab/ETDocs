# EthirisMonitor64.sys detekterad av antivirusskydd

Åtgärder när antivirusprogram flaggar filen `EthirisMonitor64.sys` i Ethiris VMS 16.x.

## Inledning

Detta dokument adresserar ett problem som kan uppstå när Ethiris VMS **16.0.0.1 eller 16.0.0.3** körs i **egen hårdvara** – dvs inte i Kentimas enheter Ethiris NVR, NVC eller NVP.

I version 16.x av Ethiris VMS finns en funktion för monitorering av hårdvara (t.ex. fläkthastigheter och temperaturer) för att kunna aktivera larm vid onormala avvikelser. För att läsa ut hårdvaruinformation skapar Ethiris VMS en fil som heter `EthirisMonitor64.sys`, som tillfälligt installeras på datorn. Denna fil innehåller en så kallad **Winring0-drivrutin** som antivirusprogram, inklusive Microsoft Windows Defender, kan reagera på.

Microsoft Windows Defender har uppdaterat sin lista över potentiella hot och detekterar numera filer med en Winring0-drivrutin.

!!! note
    I Kentimas enheter (Ethiris NVR, NVC och NVP) är installationskatalogen för Ethiris VMS undantagen i Windows Defender, vilket innebär att problemet inte uppstår i dessa enheter.

## Förutsättningar

Problemet kan uppstå om:

- Ethiris VMS version **16.0.0.1 eller 16.0.0.3** är installerat
- Systemet körs i **egen hårdvara** (ej Kentimas NVR/NVC/NVP)
- Ett aktivt antivirusprogram finns på datorn

## Lösningar

### Lösning 1 – Tillåt filen i antivirusskyddet (rekommenderas)

Filen `EthirisMonitor64.sys` är skapad av Kentima och utgör inget hot. Den bästa lösningen är att tillåta den.

**För Microsoft Windows Defender:**

1. Öppna **Windows-säkerhet**: klicka på Start-knappen, skriv "Windows-säkerhet" och öppna appen.
2. Gå till **Skydd mot virus och hot**: klicka på sköldiconen.
3. Klicka på **Hothistorik** för att se identifierade hot och vidtagna åtgärder.
4. Välj åtgärden **Tillåt på enhet**.

### Lösning 2 – Låt antivirusprogrammet ta bort filen

Om man inte vill tillåta filen kan man låta antivirusprogrammet ta bort eller sätta den i karantän. Konsekvensen är att vissa hårdvaruövervakningsfunktioner inte fungerar. Dessa funktioner är ändå begränsade i egen hårdvara jämfört med Kentimas enheter – t.ex. övervakning av fläktar och temperaturer är endast tillgänglig i Ethiris NVR, NVC och NVP.

!!! warning
    `EthirisMonitor64.exe` startas automatiskt av Ethiris-tjänsten och skapar en ny `EthirisMonitor64.sys` varje gång den körs. Windows Defender kan inte ta bort filen utan omstart, vilket gör att den återkommer.

**Alternativt:** Ta bort filen `EthirisMonitor64.exe` manuellt. På en dator som endast kör Ethiris Client tappar man då funktionen för synkning av klockan via Ethiris monitortjänst – detta kan istället hanteras via Windows inbyggda funktioner för tidssynkronisering.
