# scCameras – Overview

`scCameras` gives Ethiris the ability to continuously monitor the operational status and network performance of cameras. When something deviates — a camera loses its connection, a recording stops working, or the bandwidth exceeds a configured limit — the system can react immediately and trigger actions in real time.

## What does the script do?

- Checks whether any camera has an active communication error (offline)
- Checks whether any camera has an active recording error
- Measures average bandwidth per camera (based on the last 10 seconds)
- Calculates total bandwidth across all cameras combined
- Calculates the average amount of data recorded per hour (based on the last week)
- Sends events to the main script when status changes or a limit is exceeded

All event-driven functions trigger **only on change** — not on every check interval — which keeps the number of notifications down.

## Typical use cases

**Automatic alarm notification on camera outage**
Trigger an alarm in Ethiris or send an email (via `scMail`) automatically when a camera loses its connection — without staff having to monitor the system manually.

**Monitor network performance**
Set a limit for average or total bandwidth and raise an alarm if the network is overloaded. Useful in installations with many cameras and limited network capacity.

**Verify that recording is working**
Get an immediate indication if recording stops working on one or more cameras — for example due to full storage or a configuration error.

**Storage capacity planning**
Retrieve the average amount of data recorded per hour (based on the last week) to calculate how long the existing storage will last, and give advance warning before it runs out.

## Requirements

| Requirement | Description |
|------|-------------|
| `scExtensions` | The `scExtensions` script library must be loaded before `scCameras`. |
