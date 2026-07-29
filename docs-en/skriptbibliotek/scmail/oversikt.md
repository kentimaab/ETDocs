# scMail – Overview

`scMail` automatically sends an email when alarms are activated or reset in Ethiris. Each email includes a list of the affected alarms as well as a summary of all alarms that are still active – without staff needing to log in to the system to see the status.

## What does the script do?

- Searches through `DataStore` for all configured alarms at startup
- Checks for alarm status changes at a configurable interval
- Sends an email when one or more alarms are activated
- Sends an email when one or more alarms are deactivated
- Includes a list of all still-active alarms in every message

## Typical use cases

**Alarm notification to security staff or operations personnel**
Send an immediate email to a security control room, facility manager, or operations technician when an intrusion, fire, or technical alarm is activated – without them having to sit and monitor Ethiris manually.

**Daily status report via email**
Combine with a timer to send a daily summary of which alarms are active, giving a quick check on system health.

**Escalation of unresolved alarms**
Send an email to a secondary contact if an alarm remains active longer than expected – for example, if a door alarm is not reset after working hours.

**Audit trail and documentation**
Use the email history as a simple way to document alarm patterns and response times without needing to export data from Ethiris.

## Requirements

| Requirement | Description |
|------|-------------|
| Email object in DataStore | An email object named `Mail1` (adjustable) must be configured in the Ethiris Admin client. |
| `scExtensions` | The `scExtensions` script library must be loaded before `scMail`. |

!!! warning "Email configuration"
    Verify that the SMTP server, sender address, and recipients are correctly configured in the Ethiris Admin client before activating the script.
