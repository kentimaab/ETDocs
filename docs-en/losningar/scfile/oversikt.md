# scFile – Overview

`scFile` allows Ethiris to write and read data to and from a local text file directly from the scripting environment. Every line written is automatically stamped with the date and time, which makes the script ideal for simple logging of events, alarms, or measured values.

## What does the script do?

- Writes a timestamped line of text to the end of a specified file
- Reads the entire contents of a file and returns it as text
- Handles opening, writing, and closing the file automatically

## Typical use cases

**Event logging**
Log when alarms are activated and deactivated to a text file that can be saved and reviewed afterwards – without relying on Ethiris' internal alarm history.

**Exporting measured values**
Save bandwidth measurements or camera status at regular intervals to a CSV-like file that can easily be imported into Excel or other systems.

**Communication with external systems**
Write data to a file that is periodically read by an external program (e.g. a PLC system or a customer application) – a simple way to share information without direct integration.

**Storing configuration values**
Read a configuration value (e.g. a threshold or a schedule) from a file that can be changed without having to save the Ethiris configuration.

## Requirements

| Requirement | Description |
|------|-------------|
| The folder must exist | The folder the file is to be located in must be created manually. Default path: `C:/Ethiris/Log/`. |
| No script dependencies | The script is self-contained and does not require any other script libraries. |
