# scMail – Usage

`scMail` is a self-running script library and requires no control from the main script. Configuration is done via constants in the script.

## Configuration

The following constants can be adjusted directly in the script:

| Constant | Default value | Description |
|----------|---------------|-------------|
| `MAILNAME` | `"Mail1"` | The name of the email object in `DataStore`. Must match exactly. |
| `SEVERITY` | `10` | Severity level for alarm filtering. Used if you choose to filter by severity level. |
| `CHECK_INTERVAL` | `10000` | How often alarm status changes are checked, in milliseconds. `10000` = 10 seconds. |
| `ACTIVATEDMAILHEADER` | `"The following alarms have been activated:"` | Heading in the email when an alarm is activated. |
| `INACTIVATEDMAILHEADER` | `"The following alarms have been inactivated:"` | Heading in the email when an alarm is reset. |
| `ACTIVEMAILHEADER` | `"The following alarms are active:"` | Heading for the list of still-active alarms. |

## Alarm selection

The script retrieves alarms via `scExtensions.FindAllAlarms`. Choose one of the two options in the script:

```js
// Get all alarms (default)
scExtensions.FindAllAlarms(alarms, "", DataStore);

// Get only alarms with a specific severity level (SEVERITY)
scExtensions.FindAllAlarms(alarms, "", DataStore, SEVERITY);
```

## Email content

When an alarm event occurs, the body of the email is built up from:

1. A heading describing what happened (alarms activated or deactivated)
2. A list of the names of the affected alarms
3. A summary of all alarms that are still active

**Example email content:**

```
The following alarms have been activated:

DataStore.Larm.Rörelse_Entré

The following alarms are active:

DataStore.Larm.Rörelse_Entré
DataStore.Larm.Dörr_öppen
```

---

## The script

<a href="scMail.js" download="scMail.js" class="md-button md-button--primary">Download scMail.js</a>

```js
--8<-- "skriptbibliotek/scmail/scMail.js"
```
