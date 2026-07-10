# scExportVideo – Usage

## Init

Initializes the script with an export folder and a list of alarm objects to watch. Called once at startup.

**Parameters**

| Parameter | Type | Description |
|-----------|-----|-------------|
| `path` | `String` | Path to the folder where video files will be exported |
| `oAlarms` | `Array` | Array of alarm objects to watch |
| `bExportWhenAcked` | `Boolean` | `true` = export when the alarm is acknowledged, `false` = export immediately when the alarm is deactivated |

```js
var init;
if(init == undefined)
{
    init = true;

    scExportVideo.Init(
        "C:\\Ethiris\\Export",              // Export folder
        [DataStore.Larm.Intrång_Entré,      // Alarm 1
         DataStore.Larm.Rörelse_Parkering], // Alarm 2
        false                               // Export immediately when the alarm is deactivated
    );
}
```

---

## SetErrorAlarmObject

Links an alarm object in Ethiris that is activated if a video export fails. The alarm is automatically reset when the next export succeeds.

**Parameters**

| Parameter | Type | Description |
|-----------|-----|-------------|
| `alarmObject` | `Object` | Reference to an alarm object in `DataStore` |

```js
scExportVideo.SetErrorAlarmObject(DataStore.Larm.ExportFel);
```

---

## Export file name

Each exported file is named after the time the alarm was triggered:

```
C:\Ethiris\Export\2024-06-18 14:32:05.ethe
```

---

## Timing of the export

The script automatically takes the cameras' configured pre- and post-alarm times into account. If a camera is set to 30 seconds of pre-alarm and 60 seconds of post-alarm, the script waits until the post-alarm period has elapsed before starting the export — otherwise the end of the sequence would be missing.

!!! tip "Multiple cameras per alarm"
    If an alarm is linked to several cameras, the longest pre- and post-alarm time among all the cameras involved is used as the reference.

---

## Complete example

```js
var init;
if(init == undefined)
{
    init = true;

    // Initialize with export folder and alarm list
    scExportVideo.Init(
        "C:\\Ethiris\\Export",
        [DataStore.Larm.Intrång_Entré],
        false
    );

    // Link an error alarm for export failures (optional)
    scExportVideo.SetErrorAlarmObject(DataStore.Larm.ExportFel);
}
```

---

## The script

<a href="scExportVideo.js" download="scExportVideo.js" class="md-button md-button--primary">Download scExportVideo.js</a>

```js
--8<-- "losningar/scexportvideo/scExportVideo.js"
```
