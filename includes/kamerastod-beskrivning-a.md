### ONVIF

Ethiris har stöd för video, PTZ, I/O och Events via ONVIF.

Kentima har inte testat alla världens kameramodeller, men kameror som har stöd för **ONVIF Profile S** går sannolikt att ansluta till Ethiris.

### Generic

Ethiris har även stöd för video via RTSP. Detta innebär att kameror med stöd för RTSP går att ansluta till Ethiris genom att välja typen **Generic** och sedan ange en s.k. URL för att hämta video från kameran.

!!! note
    Ethiris har även stöd för probning mot vissa kamerafabrikat (för närvarande Axis, med firmware **4.40** eller senare), men denna anslutningstyp ingick ännu inte som en egen rad i jämförelsetabellen i den här versionen av dokumentet.

    Detta betyder att även om man inte hittar en specifik kameramodell, så kan kameran sannolikt ändå anslutas till Ethiris via ONVIF eller RTSP.
