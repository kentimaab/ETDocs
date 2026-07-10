# scSunriseSet – Användning

## calculateSunRiseSet

Beräknar soluppgångs- och solnedgångstider för angivna koordinater och returnerar resultatet direkt. Beräkningen baseras på aktuellt datum från systemklockan.

**Parametrar**

| Parameter | Typ | Beskrivning |
|-----------|-----|-------------|
| `lat` | `Number` | Latitud i decimalgrader (t.ex. `59.33` för Stockholm) |
| `lon` | `Number` | Longitud i decimalgrader (t.ex. `18.07` för Stockholm) |

**Returvärde:** `Object` med egenskaperna:

| Egenskap | Typ | Exempel | Beskrivning |
|----------|-----|---------|-------------|
| `rise` | `String` | `"06:15"` | Soluppgångstid i formatet `HH:MM` (lokal tid) |
| `set` | `String` | `"20:43"` | Solnedgångstid i formatet `HH:MM` (lokal tid) |

```js
var sun = scSunriseSet.calculateSunRiseSet(59.33, 18.07);
Debug.Print("Soluppgång: " + sun.rise);
Debug.Print("Solnedgång: " + sun.set);
```

---

## SunRiseSetCheck

Skapar ett händelsedriven övervakningsobjekt som beräknar soluppgångs- och solnedgångstider en gång per dygn. Händelsen skickas direkt vid uppstart och sedan varje dag strax efter midnatt.

**Parametrar**

| Parameter | Typ | Standardvärde | Beskrivning |
|-----------|-----|---------------|-------------|
| `latitude` | `Number` | `55.6405` | Latitud i decimalgrader |
| `longitude` | `Number` | `13.2134` | Longitud i decimalgrader |
| `name` | `String` | `"<NONAME>"` | Namn på instansen, syns i händelseobjektet |

**Händelseegenskaper**

| Egenskap | Typ | Beskrivning |
|----------|-----|-------------|
| `event.sunrise` | `String` | Soluppgångstid i formatet `HH:MM` |
| `event.sunset` | `String` | Solnedgångstid i formatet `HH:MM` |
| `event.latitude` | `Number` | Konfigurerad latitud |
| `event.longitude` | `Number` | Konfigurerad longitud |
| `event.date` | `String` | Datumet som tiderna gäller för |
| `event.name` | `String` | Instansnamnet |
| `event.text` | `String` | Beskrivande text med all information |

```js
var sun1 = new scSunriseSet.SunRiseSetCheck(59.33, 18.07, "Stockholm");
sun1.getEventTarget().onDataAvailable = function(event)
{
    Debug.Print(event.text);
    // Exempel: "Check name: Stockholm, Sunrise: 06:15, sunset: 20:43 local time,
    //           for location latitude: 59.33, longitude: 18.07, for date: 2024-06-18"

    // Använd tiderna för att styra andra funktioner, t.ex. aktivera nattläge
    // if(System.Clock.Hour + ":" + System.Clock.Minute >= event.sunset) { ... }
}
```

!!! tip "Koordinater"
    Koordinater för svenska städer hittas enkelt via Google Maps – högerklicka på en plats och välj "Vad finns här?".

---

## Skriptet

<a href="scSunriseSet.js" download="scSunriseSet.js" class="md-button md-button--primary">Ladda ner scSunriseSet.js</a>

```js
--8<-- "losningar/scsunriseset/scSunriseSet.js"
```
