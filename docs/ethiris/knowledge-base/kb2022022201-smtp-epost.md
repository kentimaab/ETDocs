# Skicka e-post via SMTP från Ethiris Server

Inställningar för Ethiris Server för att skicka e-post via SMTP.

## Inledning

Denna dokumentation innehåller information om SMTP-inställningar för ett antal vanliga e-postleverantörer, samt ett kort exempel på hur man testar SMTP-anslutningen.

## Förutsättningar

- Ethiris Server måste ha minst licensnivå **Basic**. Det går inte att skicka e-post med licensnivå **Free**.
- Du behöver tillgång till en SMTP-server, lokal eller extern.
- Avsedd för Ethiris version **11.2.0.3** eller nyare.

## Inställningar för att ansluta till en SMTP-server

I Ethiris Admin, dubbelklicka på **E-postmeddelanden** under **Notifieringar**.

| Fält | Beskrivning |
|------|-------------|
| Avsändarens namn | Det namn som visas som avsändare i e-postmeddelandena. |
| Avsändarens adress | Den e-postadress som visas som avsändaradress. |
| SMTP-server | Namnet på e-postservern som hanterar utgående e-post. |
| SMTP-port | Normalt 25 (standard). Vissa servrar använder 465 eller 587. |
| Använd SSL | Kryssa i om SMTP-servern kräver krypterad anslutning vid första kontakt. |
| Användarnamn | Används om e-postservern kräver inloggning. |
| Lösenord | Används om e-postservern kräver inloggning. |
| Minsta sändintervall | Begränsning för hur ofta e-post får skickas per definierat meddelande. Standard: 120 sekunder (tillkom i Ethiris 13.0.0.1). |

!!! note
    Ethiris e-postfunktion stödjer SSL, TLS samt okrypterad kommunikation.

## E-postleverantörer och SMTP-inställningar

| Leverantör | SMTP-server | Port | SSL | Användarnamn |
|-----------|-------------|------|-----|--------------|
| Gmail | smtp.gmail.com | 587 | Nej | Gmail-konto (xxx@gmail.com) |
| Gmail | smtp.gmail.com | 465 | Ja/Nej | Gmail-konto (xxx@gmail.com) |
| Microsoft 365 | smtp.office365.com | 587 | Nej | Office365-konto |
| Outlook | smtp-mail.outlook.com | 587 | Nej | Outlook-konto |
| Hotmail | smtp-mail.outlook.com | 587 | Nej | Hotmail-konto |
| Live | smtp-mail.outlook.com | 587 | Nej | Live-konto |
| Bahnhof | mailout.privat.bahnhof.se | 465 | Ja/Nej | Bahnhof e-postanvändarnamn |
| Telia | mailout.telia.com | 465 | Ja/Nej | Telia-konto |
| Telenor | smtp.bredband.net | 587 | Nej | Telenor-konto |
| Telenor | smtp.bredband.net | 465 | Ja/Nej | Telenor-konto |
| iCloud | smtp.mail.me.com | 587 | Nej | iCloud-konto (kräver Ethiris 14.0+) |

!!! note
    "Ja/Nej" under SSL innebär att alternativet enbart behöver kryssas i för SMTP-servrar som kräver SSL initialt.

## Testa SMTP-anslutningen

1. Dubbelklicka på **Användare** under **Säkerhet** och lägg till en e-postmottagare (du behöver inte kryssa i **Används**).
2. Dubbelklicka på **E-postmeddelanden** under **Notifieringar** och klicka på **Lägg till nytt e-postmeddelande**.
3. Konfigurera ett namn, t.ex. "TestMail", med ämne, innehåll och mottagare.
4. Spara serverkonfigurationen i Ethiris Admin.
5. Öppna **Skript-panelen** under **Logik**, lägg till **Send**-variabeln i **Watch-panelen** och dubbelklicka på **Värde** för att sätta det till `true`.
6. Kontrollera din inkorg (och skräpkorgen).

## Felsökning

**Saker att ta hänsyn till:**

1. Gmail-konton kan vara inställda på att inte tillåta "Mindre säkra appar".
2. En del leverantörer kräver tvåfaktorsautentisering, vilket kan orsaka problem.
3. iCloud/Apple kräver ett app-specifikt lösenord – skapa det via ditt iCloud-konto.
4. Microsoft 365 kan ha "SMTP Client Authentication" avstängt – detta behöver aktiveras i ditt Microsoft-konto.
5. De flesta SMTP-servrar kräver att avsändaradressen matchar det inloggade användarkontot.

**Logg för felsökning:**

Öppna filen `C:\Program Files (x86)\Kentima AB\Ethiris\WorkFolder\EthirisServerTrace.log` i en textredigerare och sök efter `#Error CMessenger`.

| Felkod | Trolig orsak |
|--------|-------------|
| `SSL connection failed` | Prova att kryssa ur **Använd SSL** – kryptering förhandlas ändå om servern stödjer det. |
| `535 5.7.8 Username and Password not accepted` | Felaktiga inloggningsuppgifter, eller servern kräver app-specifikt lösenord. |
| `Could not connect to SMTP server ... at port ...` | SMTP-server eller SMTP-port är felaktigt konfigurerade. |
