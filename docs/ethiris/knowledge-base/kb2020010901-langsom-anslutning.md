# Långsam anslutning till Ethiris Server efter uppgradering

Anslutning av Ethiris Server i Ethiris Admin och Ethiris Client tar lång tid efter uppgradering till Ethiris 11.0.0.1 eller senare.

## Inledning

I de fall Ethiris är driftsatt i en miljö utan Internetåtkomst på de enheter som används till Ethiris Admin och Ethiris Client, och man på dessa enheter har konfigurerat en Standard-gateway samt en eller flera DNS-servrar, uppstår en fördröjning vid anslutning mot Ethiris Server. Detta sker såväl vid uppstart som vid andra tillfällen när Ethiris Admin/Client behöver ansluta mot Ethiris Server.

Problemet har inget med Ethiris att göra utan beror på att Windows försöker uppdatera så kallade rotcertifikat för att validera de certifikat som används för säker kommunikation via SSL. Detta sker trots att datorn saknar internetkontakt och därför tar det så lång tid som timeouten är satt till, lite drygt 10 sekunder.

## Lösning 1 – Automatiskt i version 11.2 eller senare

Från version 11.2 av Ethiris kommer Ethiris Admin och Ethiris Client att automatiskt detektera problemet och föreslå att Ethiris löser det genom att uppdatera inställningarna i Windows.

Klicka **Ja** för att låta Ethiris genomföra förändringarna. En UAC-fråga ställs – svara **Ja/Yes**.

Ett meddelande att allt gått bra visas och problemet på denna dator är ur världen.

Om du svarar **Nej/No** eller något misslyckas kan du använda Lösning 2 eller 3 istället.

## Lösning 2 – Manuellt, ta bort DNS-servrar

Om nätverksmiljön tillåter det, dvs inga lokala DNS-namn nyttjas, är den enklaste lösningen att ta bort de DNS-servrar som är angivna på nätverksanslutningen.

Gå till nätverkskortes TCP/IPv4-egenskaper och rensa fälten för DNS-servrar.

## Lösning 3 – Manuellt, uppdatera registret

[Ladda ner KB2020010901.zip](KB2020010901.zip){ .md-button }

1. Ladda ner filen **KB2020010901.zip** ovan.
2. Högerklicka på filen efter nedladdningen och välj **Extrahera alla…**, klicka sedan **Extrahera**.
3. Högerklicka på **KB2020010901.reg** och välj **Slå samman** från menyn.
4. Klicka **Ja** på UAC-dialogen som dyker upp.
5. Klicka **Ja** på nästa bekräftelsedialog.
6. Klicka **OK**.

Ingen omstart behövs – ändringen tar effekt direkt.
