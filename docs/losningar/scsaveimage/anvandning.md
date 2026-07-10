# scSaveImage – Användning

`scSaveImage` är ett självkörande skriptbibliotek och har inga publika funktioner som behöver anropas från huvudskriptet. Konfigurationen görs direkt i skriptets variabler.

## Konfiguration

Följande konstanter i skriptet kan justeras:

| Konstant | Standardvärde | Beskrivning |
|----------|---------------|-------------|
| `INTERVAL` | `60000` | Intervall i millisekunder mellan varje bildsparning. `60000` = 1 minut. |
| `PATH` | `"C:/Ethiris/Snapshots"` | Mappen där bilderna sparas. Mappen måste finnas. |

## Kameror som inkluderas

Som standard inkluderas **alla** kameror i systemet. Skriptet itererar automatiskt genom `Cameras`-objektet. För att begränsa till specifika kameror, ersätt den aktuella `for`-loopen med en manuell lista:

```js
// Option 1 (standard) – alla kameror
for(var camera in Cameras)
{
    cameraArray.push(Cameras[camera]);
}

// Option 2 – specifika kameror
this.cameraCollection = new CameraCollection(Camera_1, Camera_2, Camera_3);
```

## Bildfilernas namn

Bilderna sparas med kamerans namn som filnamn i den angivna mappen. Exempel:

```
C:/Ethiris/Snapshots/Entré.jpg
C:/Ethiris/Snapshots/Parkering_bak.jpg
```

!!! note "Befintliga filer skrivs över"
    Bildfilen skrivs över vid varje sparning. Inga historiska bilder sparas — skriptet behåller alltid den senaste bilden per kamera.

---

## Skriptet

<a href="scSaveImage.js" download="scSaveImage.js" class="md-button md-button--primary">Ladda ner scSaveImage.js</a>

```js
--8<-- "losningar/scsaveimage/scSaveImage.js"
```
