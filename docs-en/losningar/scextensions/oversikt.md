# scExtensions – Overview

`scExtensions` is a helper library that extends Ethiris' built-in scripting environment with missing basic functions. It is a technical support library required by several other script libraries in the collection.

## What does the script do?

The script provides a number of utilities that the other script libraries build on:

- Calculates the average of an array of numbers
- Checks whether a number is even or odd
- Splits strings at a specified delimiter
- Searches through `DataStore` and collects all configured alarms
- Calculates the number of milliseconds remaining until midnight (used for nightly updates)
- Converts byte values into human-readable text with an appropriate unit (B, KiB, MiB, GiB, etc.)

## Requirements

| Requirement | Description |
|------|-------------|
| No external dependencies | The script is self-contained and does not require any other script libraries. |

!!! warning "Add scExtensions first"
    `scCameras`, `scMail`, and `scSunriseSet` require `scExtensions` to be loaded. Always add `scExtensions` **before** these libraries in the Ethiris script list.
