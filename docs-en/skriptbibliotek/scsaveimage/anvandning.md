# scSaveImage – Usage

`scSaveImage` is a self-running script library and has no public functions that need to be called from the main script. Configuration is done directly in the script's variables.

## Configuration

The following constants in the script can be adjusted:

| Constant | Default value | Description |
|----------|---------------|-------------|
| `INTERVAL` | `60000` | Interval in milliseconds between each image save. `60000` = 1 minute. |
| `PATH` | `"C:/Ethiris/Snapshots"` | The folder where the images are saved. The folder must exist. |

## Cameras included

By default, **all** cameras in the system are included. The script automatically iterates through the `Cameras` object. To limit it to specific cameras, replace the current `for` loop with a manual list:

```js
// Option 1 (default) – all cameras
for(var camera in Cameras)
{
    cameraArray.push(Cameras[camera]);
}

// Option 2 – specific cameras
this.cameraCollection = new CameraCollection(Camera_1, Camera_2, Camera_3);
```

## Image file names

The images are saved using the camera's name as the file name in the specified folder. Example:

```
C:/Ethiris/Snapshots/Entré.jpg
C:/Ethiris/Snapshots/Parkering_bak.jpg
```

!!! note "Existing files are overwritten"
    The image file is overwritten on every save. No historical images are kept — the script always retains only the most recent image per camera.

---

## The script

<a href="scSaveImage.js" download="scSaveImage.js" class="md-button md-button--primary">Download scSaveImage.js</a>

```js
--8<-- "skriptbibliotek/scsaveimage/scSaveImage.js"
```
