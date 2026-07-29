# scSunriseSet – Usage

## calculateSunRiseSet

Calculates the sunrise and sunset times for the specified coordinates and returns the result directly. The calculation is based on the current date from the system clock.

**Parameters**

| Parameter | Type | Description |
|-----------|-----|-------------|
| `lat` | `Number` | Latitude in decimal degrees (e.g. `59.33` for Stockholm) |
| `lon` | `Number` | Longitude in decimal degrees (e.g. `18.07` for Stockholm) |

**Return value:** `Object` with the properties:

| Property | Type | Example | Description |
|----------|-----|---------|-------------|
| `rise` | `String` | `"06:15"` | Sunrise time in `HH:MM` format (local time) |
| `set` | `String` | `"20:43"` | Sunset time in `HH:MM` format (local time) |

```js
var sun = scSunriseSet.calculateSunRiseSet(59.33, 18.07);
Debug.Print("Sunrise: " + sun.rise);
Debug.Print("Sunset: " + sun.set);
```

---

## SunRiseSetCheck

Creates an event-driven monitoring object that calculates sunrise and sunset times once per day. The event is sent immediately at startup and then every day shortly after midnight.

**Parameters**

| Parameter | Type | Default value | Description |
|-----------|-----|---------------|-------------|
| `latitude` | `Number` | `55.6405` | Latitude in decimal degrees |
| `longitude` | `Number` | `13.2134` | Longitude in decimal degrees |
| `name` | `String` | `"<NONAME>"` | Name of the instance, visible in the event object |

**Event properties**

| Property | Type | Description |
|----------|-----|-------------|
| `event.sunrise` | `String` | Sunrise time in `HH:MM` format |
| `event.sunset` | `String` | Sunset time in `HH:MM` format |
| `event.latitude` | `Number` | Configured latitude |
| `event.longitude` | `Number` | Configured longitude |
| `event.date` | `String` | The date the times apply to |
| `event.name` | `String` | The instance name |
| `event.text` | `String` | Descriptive text with all the information |

```js
var sun1 = new scSunriseSet.SunRiseSetCheck(59.33, 18.07, "Stockholm");
sun1.getEventTarget().onDataAvailable = function(event)
{
    Debug.Print(event.text);
    // Example: "Check name: Stockholm, Sunrise: 06:15, sunset: 20:43 local time,
    //           for location latitude: 59.33, longitude: 18.07, for date: 2024-06-18"

    // Use the times to control other functions, e.g. enabling night mode
    // if(System.Clock.Hour + ":" + System.Clock.Minute >= event.sunset) { ... }
}
```

!!! tip "Coordinates"
    Coordinates for Swedish cities can easily be found via Google Maps — right-click a location and select "What's here?".

---

## The script

<a href="scSunriseSet.js" download="scSunriseSet.js" class="md-button md-button--primary">Download scSunriseSet.js</a>

```js
--8<-- "skriptbibliotek/scsunriseset/scSunriseSet.js"
```
