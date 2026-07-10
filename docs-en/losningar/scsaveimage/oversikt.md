# scSaveImage – Overview

`scSaveImage` automatically saves JPEG images from cameras in Ethiris at a configurable time interval. The script manages everything independently – it does not need to be called from the main script – and always checks that the camera is online and streaming video before each save, so that you never save a broken or empty image.

## What does the script do?

- Saves JPEG images from all cameras, or from a selected subset
- Checks that the camera is online and streaming video before an image is saved
- Runs automatically at a configurable interval (default: 1 minute)
- Writes the status of each save to the Debug Output Panel in Ethiris Admin
- Handles errors without crashing – an offline camera does not affect the other cameras

## Typical use cases

**Automatic image archiving**
Save images from all surveillance cameras every three minutes to a NAS or a local folder – without staff having to do anything manually. The images can be used as timestamped evidence or to follow up on events afterwards.

**Webcam view on a website or intranet**
Save images at short intervals (e.g. every 30 seconds) and let a web server display them on an information screen or portal. Staff and visitors can see a current view without needing direct access to Ethiris.

**Evidence collection during alarms**
Combine with an alarm system: trigger a higher image capture rate when an alarm is activated and let `scSaveImage` automatically document the course of events visually.

**Checking camera quality and positioning**
Use regularly saved images to quickly see whether a camera has become misaligned, damaged, or obstructed – without having to log in to the client application.

## Requirements

| Requirement | Description |
|------|-------------|
| Ethiris 14 or later | The script library requires at least Ethiris version 14. |
| License: Script Library | The "Script Library" license feature must be enabled. |
| Save folder | The configured path (`PATH`) must exist on the server before the script is started. |

!!! warning "Self-contained script"
    `scSaveImage` is an autonomous script library and must **not** be called from the main script. Configuration is done directly inside the script library via the `TIMEOUT` and `PATH` parameters and the camera list.

!!! note "Existing images are overwritten"
    A new image always overwrites the previous one. The script always keeps only the most recent image per camera – not a history.
