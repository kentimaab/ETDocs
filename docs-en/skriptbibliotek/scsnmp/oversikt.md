# scSNMP – Overview

`scSNMP` retrieves data from network-connected equipment via the SNMP protocol and delivers the information as events to the Ethiris main script. The script is event-driven — you don't need to poll for new data, everything is handled automatically at configurable intervals. The script includes predefined MIB profiles for Synology NAS, HP switches, and Aruba switches, and can monitor several devices at the same time.

## What does the script do?

- Retrieves system status, temperature, power supply, and fan status from Synology NAS
- Monitors individual hard drives: health status, temperature, bad sectors, and remaining lifespan
- Sends an event if the system temperature exceeds a configurable limit
- Retrieves CPU usage, memory status, port status, and fan status from HP and Aruba switches
- Monitors PoE status per port on Aruba switches (voltage, current, power, and type)
- Can monitor several devices of the same or different types at the same time
- Supports polling at a fixed interval **or** manual data retrieval via `getData()`

## Typical use cases

**Temperature alarms for NAS and server rooms**
Raise an alarm automatically in Ethiris — or send an email via `scMail` — if the NAS device's temperature exceeds a limit. Catches overheating in good time, for example in the event of an AC failure in the server room.

**Hard drive monitoring and proactive failure warning**
Monitor health status and temperature on all drives in the NAS device. Raise an alarm immediately when a drive reports a problem — long before a failure occurs and recorded data risks being lost.

**Network monitoring without extra tools**
Identify if a switch port has lost link (camera cable unplugged), if bandwidth is abnormally high, or if a fan has stopped working — without having to log in to a separate network management portal.

**PoE monitoring for IP cameras**
Keep track of power consumption per PoE port. Abnormal power consumption can indicate a hardware problem on the camera, and an alarm can be triggered automatically.

**Bring all operational monitoring together in one system**
Display NAS and switch status as variables directly in the Ethiris operator interface — a single place for technicians and guards to check the health of the whole system.

## Tested devices

| Device | Available profiles |
|-------|----------------------|
| Synology RS1219+ | SynologySystemMIB, SynologyDiskMIB, SynologySystemTemperatureCheck |
| HPE OfficeConnect 1950 12XGT 4SFP+ | HPSystemMIB, HPPortMIB, HPFanMIB |
| Aruba Instant On 1930 24G Class4 PoE (JL683B) | ArubaSystemMIB, ArubaFanMIB, ArubaPortMIB, ArubaPoeMIB |

## Requirements

| Requirement | Description |
|------|-------------|
| `scExtensions` | The `scExtensions` script library must be loaded before `scSNMP`. |
| Ethiris 14 or later | The script library requires at least Ethiris version 14. |
| License: Script library | The "Script library" license feature must be enabled. |
| License: SNMP reader | The Ethiris "SNMP reader" feature must be licensed. |
| SNMP enabled on the device | SNMPv2c must be enabled on the device to be monitored. |
| Network access | The Ethiris server must be able to reach the device on the SNMP port (default: UDP 161). |
