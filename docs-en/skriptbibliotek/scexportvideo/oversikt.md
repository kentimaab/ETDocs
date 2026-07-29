# scExportVideo – Overview

`scExportVideo` automatically exports video footage when an alarm is triggered. The entire sequence — including the cameras' configured pre- and post-alarm recording — is saved as a complete video file without an operator having to intervene.

## What does the script do?

- Listens for status changes on the specified alarm objects
- Records the time at which the alarm was triggered
- Waits until the post-alarm time has elapsed after the alarm is deactivated
- Exports the video footage to a specified folder in `.ethe` format
- Automatically includes the cameras' configured pre- and post-alarm times
- Triggers an optional error alarm if the export fails
- Handles multiple alarms and cameras within the same instance

## Typical use cases

**Automatic evidence handling for security events**
Automatically export video sequences on intrusion alarms, motion detection, or other security events. The files are immediately available to security guards, police, or the insurance company — without staff having to search manually through recordings.

**Regulatory requirements for video archiving**
Meet requirements from insurance companies or authorities that video footage surrounding alarm events be archived and made available on request.

**Automatic documentation of deliveries or vehicle movements**
Link an alarm to a gate opening or a motion detection area and automatically export video footage every time an event occurs — as a timestamped log of the activity.

**More efficient handling for security companies**
Instead of guards manually having to export clips after an event, everything happens automatically. The files are ready to be sent immediately after the alarm is reset.

## Requirements

| Requirement | Description |
|------|-------------|
| Alarm objects configured | The alarm objects that should trigger an export must exist in Ethiris and have cameras linked to them. |
| Export folder must exist | The specified destination folder must be created manually. The script cannot create folders. |
| No script dependencies | The script is standalone and requires no other script libraries. |

!!! info "Export format"
    Video files are exported in the Ethiris format `.ethe`. These are opened with Ethiris Player.
