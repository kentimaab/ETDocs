# scSunriseSet – Overview

`scSunriseSet` calculates the local time of sunrise and sunset for any geographic position, specified as latitude and longitude. The script updates itself automatically every midnight and immediately after Ethiris starts, and delivers the times as events to the main script — without you having to poll or calculate anything yourself.

## What does the script do?

- Calculates the exact local time of sunrise and sunset based on latitude and longitude
- Sends an event with the times one second after Ethiris Server is started or saved
- Automatically updates every midnight ahead of the next day's times
- Can be triggered manually via `getData()` at any time
- Returns: `sunrise`, `sunset`, `latitude`, `longitude`, `date`, `name`, and a ready-formatted `text` string

## Typical use cases

**Enable night mode automatically**
Switch to IR cameras, a night recording profile, or higher motion detection sensitivity exactly when the sun sets — and revert to the day profile at sunrise. No manual adjustment is needed throughout the year.

**Control outdoor lighting via Ethiris**
Trigger relays or I/O outputs to turn on lighting at sunset and turn it off at sunrise — precisely adapted to the current date and location, not a fixed time of day.

**Time-based alarm rules based on daylight**
Enable stricter alarm profiles at night and more tolerant ones during the day, without building schedules that must be maintained manually every season.

**Logging daylight hours**
Combine with `scFile` to log sunrise and sunset daily — useful for energy tracking or system analysis over time.

## Requirements

| Requirement | Description |
|------|-------------|
| `scExtensions` | The `scExtensions` script library must be loaded before `scSunriseSet`. |
| License: Advanced / Universal level 4 | The script library requires license level Advanced or Universal level 4 or higher. |

!!! tip "Default position"
    If latitude and longitude are not specified, the default value `55.6405, 13.2134` (Staffanstorp) is used. Always specify the correct position for the installation site to get accurate sunrise and sunset times.
