# Servicekonto i Active Directory för Single Sign On

Uppsättning av ett servicekonto i ett Active Directory för att ge Ethiris Server tillräckliga rättigheter för Single Sign On (SSO).

## Inledning

I version 13.0 av Ethiris infördes möjligheten att sätta upp Single Sign On (SSO) för Ethirissystem. Det innebär att den användare som för tillfället är inloggad i Windows, på den dator där Ethiris Client startas, automatiskt blir inloggad i Ethiris med samma användare.

**Förutsättningar för SSO:**

- Licensnivå Premium eller Universal funktionsnivå 6.
- Både Ethiris Client-datorn och Ethiris Server-datorn måste vara medlemmar i samma domän.
- Ethiris Server måste ha tillräckliga rättigheter för att fråga Active Directory (AD) efter information om den inloggade användaren.

Den rekommenderade metoden för att ge Ethiris Server dessa rättigheter är att sätta upp ett specifikt servicekonto i AD.

## Steg 1 – Lägg till ett servicekonto i AD

1. Starta **Server Manager**.
2. Välj menyn **Tools**.
3. Välj alternativet **Active Directory Users and Computers**.
4. I dialogen, högerklicka på **Service Accounts** i aktuell domän och välj **Nytt → Användare**.
5. Ange ett namn för användarkontot, t.ex. `sa-ethiris`. Klicka **Nästa**.
6. Ange ett lösenord. Rekommendation: bocka för **Lösenordet upphör aldrig att gälla** för att slippa byta det i framtiden. Klicka **Nästa** för att skapa kontot.

## Steg 2 – Delegera kontroll till kontot

7. Högerklicka på **aktuell domän** och välj **Delegera kontroll…**.
8. En guide startar – klicka **Nästa**.
9. Klicka på knappen **Lägg till**.
10. Skriv in namnet på det nya användarkontot, t.ex. `sa-ethiris`. Klicka på **Kontrollera namn** för att verifiera, sedan **OK**.
11. Klicka **Nästa**.
12. Välj **Delegera kontroll för följande vanliga aktiviteter** och bocka för **Läsa all användarinformation**. Klicka **Nästa**.
13. Avsluta guiden genom att klicka **Slutför**.

## Steg 3 – Ange kontot i Ethiris Admin

14. I Ethiris Admin, dubbelklicka på den Ethiris Server som ska tillåta SSO.
15. I fliken **Server**, bocka för **Tillåt att klienter loggar in med SSO**.
16. Ange **Domän\Användare** och tillhörande **Lösenord** för servicekontot, t.ex. `Kentima\sa-ethiris`.
