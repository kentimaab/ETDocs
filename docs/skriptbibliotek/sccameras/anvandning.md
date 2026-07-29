# scCameras – Användning

`scCameras` kan användas på två sätt: antingen med enkla funktionsanrop som returnerar aktuell status direkt (Metod 1), eller med händelsedrivna övervakningsobjekt som triggar en callback när status förändras (Metod 2).

---

## getCameraCommunicationError

Returnerar `true` om någon kamera i systemet för tillfället har ett kommunikationsfel.

**Returvärde:** `Boolean`

```js
var harFel = scCameras.getCameraCommunicationError();
if(harFel)
    Debug.Print("En eller flera kameror är offline.");
```

---

## CommunicationErrorCheck

Händelsedriven övervakare för kommunikationsfel. Skapar ett objekt som periodiskt kontrollerar om kommunikationsfel uppstår eller återställs, och skickar en händelse vid varje förändring.

**Parametrar**

| Parameter | Typ | Standardvärde | Beskrivning |
|-----------|-----|---------------|-------------|
| `interval` | `Number` | `10000` | Kontrollintervall i millisekunder |
| `name` | `String` | `"<NONAME>"` | Namn på instansen, syns i händelseobjektet |

**Händelseegenskaper**

| Egenskap | Typ | Beskrivning |
|----------|-----|-------------|
| `event.isCommError` | `Boolean` | `true` om kommunikationsfel är aktivt |
| `event.name` | `String` | Instansnamnet |
| `event.text` | `String` | Beskrivande text |

```js
var ce1 = new scCameras.CommunicationErrorCheck(10000, "ce1");
ce1.getEventTarget().onDataAvailable = function(event)
{
    if(event.isCommError)
        Debug.Print("Kommunikationsfel aktivt – en eller flera kameror är offline.");
    else
        Debug.Print("Kommunikationsfel återställt – alla kameror är online.");
}
```

---

## getCameraRecordingError

Returnerar `true` om någon kamera i systemet för tillfället har ett inspelningsfel.

**Returvärde:** `Boolean`

```js
var harInspelningsfel = scCameras.getCameraRecordingError();
```

---

## RecordingErrorCheck

Händelsedriven övervakare för inspelningsfel. Fungerar på samma sätt som `CommunicationErrorCheck`.

**Parametrar**

| Parameter | Typ | Standardvärde | Beskrivning |
|-----------|-----|---------------|-------------|
| `interval` | `Number` | `10000` | Kontrollintervall i millisekunder |
| `name` | `String` | `"<NONAME>"` | Namn på instansen |

**Händelseegenskaper**

| Egenskap | Typ | Beskrivning |
|----------|-----|-------------|
| `event.isRecError` | `Boolean` | `true` om inspelningsfel är aktivt |

```js
var re1 = new scCameras.RecordingErrorCheck(10000, "re1");
re1.getEventTarget().onDataAvailable = function(event)
{
    if(event.isRecError)
        Debug.Print("Inspelningsfel aktivt.");
    else
        Debug.Print("Inspelningsfel återställt.");
}
```

---

## getAverageCameraBandwidth

Returnerar genomsnittlig bandbredd per kamera i Bytes/s, baserat på de senaste 10 sekunderna. Kameror som är offline räknas inte med.

**Returvärde:** `Number` – genomsnittlig bandbredd i Bytes/s, eller `0` om inga kameror streamar.

```js
var bw = scCameras.getAverageCameraBandwidth();
Debug.Print("Genomsnittlig bandbredd: " + scExtensions.bytesToSize(bw) + "/s");
```

---

## AverageCameraBandwidthCheck

Händelsedriven gränsövervakare för genomsnittlig bandbredd per kamera.

**Parametrar**

| Parameter | Typ | Standardvärde | Beskrivning |
|-----------|-----|---------------|-------------|
| `limit` | `Number` | `5242880` (5 MiB/s) | Gränsvärde i Bytes/s |
| `interval` | `Number` | `10000` | Kontrollintervall i millisekunder |
| `name` | `String` | `"<NONAME>"` | Namn på instansen |

**Händelseegenskaper**

| Egenskap | Typ | Beskrivning |
|----------|-----|-------------|
| `event.isAboveLimit` | `Boolean` | `true` om bandbredden överstiger gränsvärdet |
| `event.isBelowLimit` | `Boolean` | `true` om bandbredden understiger gränsvärdet |
| `event.limit` | `Number` | Konfigurerat gränsvärde i Bytes/s |
| `event.currentAverageCameraBandwidth` | `Number` | Aktuell genomsnittlig bandbredd i Bytes/s |

```js
var bw1 = new scCameras.AverageCameraBandwidthCheck(10485760, 10000, "bw1"); // 10 MiB/s
bw1.getEventTarget().onDataAvailable = function(event)
{
    if(event.isAboveLimit)
        Debug.Print("Genomsnittlig bandbredd överstiger " + scExtensions.bytesToSize(event.limit) + "/s");
    else
        Debug.Print("Genomsnittlig bandbredd är under " + scExtensions.bytesToSize(event.limit) + "/s");
}
```

---

## getTotalCameraBandwidth

Returnerar total bandbredd för alla kameror i Bytes/s (summan av varje kamerans genomsnittsvärde de senaste 10 sekunderna).

**Returvärde:** `Number` – total bandbredd i Bytes/s.

```js
var tot = scCameras.getTotalCameraBandwidth();
Debug.Print("Total bandbredd: " + scExtensions.bytesToSize(tot) + "/s");
```

---

## TotalCameraBandwidthCheck

Händelsedriven gränsövervakare för total bandbredd. Fungerar på samma sätt som `AverageCameraBandwidthCheck`.

**Parametrar**

| Parameter | Typ | Standardvärde | Beskrivning |
|-----------|-----|---------------|-------------|
| `limit` | `Number` | `104857600` (100 MiB/s) | Gränsvärde i Bytes/s |
| `interval` | `Number` | `10000` | Kontrollintervall i millisekunder |
| `name` | `String` | `"<NONAME>"` | Namn på instansen |

**Händelseegenskaper**

| Egenskap | Typ | Beskrivning |
|----------|-----|-------------|
| `event.isAboveLimit` | `Boolean` | `true` om total bandbredd överstiger gränsvärdet |
| `event.isBelowLimit` | `Boolean` | `true` om total bandbredd understiger gränsvärdet |
| `event.currentTotalCameraBandwidth` | `Number` | Aktuell total bandbredd i Bytes/s |

---

## getAverageCameraRecordingHour

Returnerar genomsnittlig inspelad datamängd per timme för alla kameror, baserat på den senaste veckan. Värdet anges i Bytes.

**Returvärde:** `Number` – genomsnittlig inspelad datamängd per timme i Bytes.

```js
var rec = scCameras.getAverageCameraRecordingHour();
Debug.Print("Genomsnittlig inspelning per timme: " + scExtensions.bytesToSize(rec));
```

---

## AverageCameraRecordingHourCheck

Händelsedriven gränsövervakare för genomsnittlig inspelning per timme.

**Parametrar**

| Parameter | Typ | Standardvärde | Beskrivning |
|-----------|-----|---------------|-------------|
| `limit` | `Number` | `104857600` (100 MiB) | Gränsvärde i Bytes per timme |
| `interval` | `Number` | `10000` | Kontrollintervall i millisekunder |
| `name` | `String` | `"<NONAME>"` | Namn på instansen |

**Händelseegenskaper**

| Egenskap | Typ | Beskrivning |
|----------|-----|-------------|
| `event.isAboveLimit` | `Boolean` | `true` om inspelningen överstiger gränsvärdet |
| `event.isBelowLimit` | `Boolean` | `true` om inspelningen understiger gränsvärdet |
| `event.currentAverageCameraRecordingHour` | `Number` | Aktuell genomsnittlig inspelning per timme i Bytes |

---

## Skriptet

<a href="scCameras.js" download="scCameras.js" class="md-button md-button--primary">Ladda ner scCameras.js</a>

```js
--8<-- "skriptbibliotek/sccameras/scCameras.js"
```
