# Skicka SMS med Teltonika – Översikt

!!! info "Licenskrav"
    Användning av pluginet kräver en Ethiris Premium-licens med optionen .NET-plugin.

Med hjälp av ett .NET-plugin kan Ethiris skicka SMS direkt från systemet, utan mellanliggande tjänster eller externa SMS-gateways. Pluginet kommunicerar med en Teltonika-router via dess inbyggda REST API och skickar SMS genom det mobilnät som routern är ansluten till.

## Varför skicka SMS från Ethiris?

E-post och larmklienter fungerar bra så länge någon aktivt bevakar dem, men SMS når fram direkt till mobilen även när ingen sitter framför en skärm eller är inloggad i systemet. Det gör SMS särskilt värdefullt i situationer där snabb uppmärksamhet är avgörande, till exempel:

- **Larm går aktivt** – väktare, fastighetsskötare eller driftpersonal får omedelbar notis om inbrotts-, brand- eller tekniklarm, oavsett var de befinner sig.
- **Rörelse upptäckt utanför kontorstid** – ett SMS skickas direkt om rörelse detekteras i lokalerna kvällar, nätter eller helger, när ingen förväntas vara på plats.
- **Eskalering av olösta larm** – om ett larm förblir aktivt längre än förväntat kan ett uppföljande SMS skickas till en sekundär kontakt eller jourhavande.
- **Driftstörningar** – SMS vid till exempel förlorad kameraanslutning, fullt lagringsutrymme eller andra tekniska avvikelser som kräver snabb åtgärd.

Eftersom SMS skickas via routerns eget mobilnätsabonnemang är lösningen dessutom oberoende av kontorets internetuppkoppling, vilket gör den robust vid nätverksstörningar där e-postbaserade notifieringar annars skulle utebli.

## Vilka Teltonika-routrar stöds?

Pluginet fungerar med Teltonika-routrar som kör RutOS och som exponerar Web API / REST API. För att använda API:et krävs följande lägsta firmwareversion:

| Routerfamilj | Lägsta firmwareversion |
|--------------|-------------------------|
| RUT2, RUT9, RUTM, RUTC, TRB och övriga familjer | 7.15 eller senare |
| RUTX-familjen | 7.12 eller senare |

Funktionen för att skicka SMS ligger under **Mobile Utilities**, ett inbyggt gränssnitt i RutOS som finns med på alla Teltonikas mobila routrar (RUT-, RUTX- och TRB-serierna) – det är alltså inget separat paket som behöver installeras via Package Manager, utan en standardfunktion så länge firmwarekravet ovan är uppfyllt.
