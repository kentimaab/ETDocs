# scSNMP – Usage

All functions in `scSNMP` create event-driven monitoring objects. The objects poll the device at a configurable interval and send an event to the main script every time new data has been retrieved.

---

## SynologySystemMIB

Retrieves overall system status from a Synology NAS.

**Parameters**

| Parameter | Type | Default value | Description |
|-----------|-----|---------------|-------------|
| `ipAddress` | `String` | *(required)* | IP address of the NAS device |
| `name` | `String` | `"<NONAME>"` | Name of the instance |
| `poll` | `Boolean` | `true` | `true` starts automatic polling |
| `interval` | `Number` | `3600000` (60 min) | Poll interval in milliseconds |
| `port` | `Number` | `161` | SNMP port |
| `community` | `String` | `"public"` | SNMP community string |

**Available data in the event (`event.data`)**

| Property | Description |
|----------|-------------|
| `systemStatus` | System status: Normal, Failed |
| `temperature` | System temperature in Celsius |
| `powerStatus` | Power supply status |
| `systemFanStatus` | System fan status |
| `cpuFanStatus` | CPU fan status |
| `modelName` | Model name |
| `serialNumber` | Serial number |
| `version` | DSM version |
| `upgradeAvailable` | Whether a DSM update is available |
| `ssCpuSystem` | CPU usage as a percentage |
| `memTotalReal` | Total RAM |
| `memAvailReal` | Free RAM |
| `memCached` | Cached memory |

```js
var snmp1 = new scSNMP.SynologySystemMIB("192.168.1.10", "NAS_Ethiris");
snmp1.getEventTarget().onDataAvailable = function(event)
{
    if(!event.error)
    {
        Debug.Print("NAS system status: " + event.data.systemStatus.status);
        Debug.Print("NAS temperature: " + event.data.temperature.value + "°C");
    }
    else
        Debug.Print("Error during SNMP retrieval: " + event.errorMessage);
}
```

---

## SynologyDiskMIB

Retrieves per-disk status from a Synology NAS.

**Parameters**

| Parameter | Type | Default value | Description |
|-----------|-----|---------------|-------------|
| `ipAddress` | `String` | *(required)* | IP address of the NAS device |
| `name` | `String` | `"<NONAME>"` | Name of the instance |
| `disks` | `Array<Number>` | `[1,2,3,4,5,6,7,8]` | List of disk indexes to monitor |
| `poll` | `Boolean` | `true` | `true` starts automatic polling |
| `interval` | `Number` | `3600000` (60 min) | Poll interval in milliseconds |
| `port` | `Number` | `161` | SNMP port |
| `community` | `String` | `"public"` | SNMP community string |

**Available data per disk (`event.data["Disk N"]`)**

| Property | Description |
|----------|-------------|
| `diskStatus` | Normal, Initialized, Crashed, etc. |
| `diskHealthStatus` | Normal, Warning, Critical, Failing |
| `diskTemperature` | Disk temperature in Celsius |
| `diskModel` | Disk model |
| `diskRemainLife` | Estimated remaining lifespan |
| `diskBadSector` | Number of bad sectors |

```js
var snmp2 = new scSNMP.SynologyDiskMIB("192.168.1.10", "NAS_Disks", [1,2,3,4]);
snmp2.getEventTarget().onDataAvailable = function(event)
{
    if(!event.error)
    {
        Debug.Print("Disk 1 status: " + event.data["Disk 1"].diskStatus.status);
        Debug.Print("Disk 1 temperature: " + event.data["Disk 1"].diskTemperature.value + "°C");
    }
}
```

---

## SynologySystemTemperatureCheck

Event-driven temperature monitoring for Synology NAS. Sends an event when the temperature crosses a configured limit in either direction.

**Parameters**

| Parameter | Type | Default value | Description |
|-----------|-----|---------------|-------------|
| `ipAddress` | `String` | *(required)* | IP address of the NAS device |
| `limit` | `Number` | `50` | Temperature limit in Celsius |
| `name` | `String` | `"<NONAME>"` | Name of the instance |
| `port` | `Number` | `161` | SNMP port |
| `community` | `String` | `"public"` | SNMP community string |
| `interval` | `Number` | `10000` | Check interval in milliseconds |

**Event properties**

| Property | Type | Description |
|----------|-----|-------------|
| `event.isAboveLimit` | `Boolean` | `true` if the temperature exceeds the limit |
| `event.isBelowLimit` | `Boolean` | `true` if the temperature is below the limit |
| `event.currentTemperature` | `Number` | Current temperature in Celsius |
| `event.limit` | `Number` | Configured limit |

```js
var snmp3 = new scSNMP.SynologySystemTemperatureCheck("192.168.1.10", 45, "NAS_Temp");
snmp3.getEventTarget().onDataAvailable = function(event)
{
    if(!event.error)
        Debug.Print(event.text);
}
```

---

## HPSystemMIB

Retrieves overall system status from an HP switch (tested on HPE OfficeConnect 1950).

**Parameters**

| Parameter | Type | Default value | Description |
|-----------|-----|---------------|-------------|
| `ipAddress` | `String` | *(required)* | IP address of the switch |
| `name` | `String` | `"<NONAME>"` | Name of the instance |
| `poll` | `Boolean` | `true` | `true` starts automatic polling |
| `interval` | `Number` | `3600000` (60 min) | Poll interval in milliseconds |
| `port` | `Number` | `161` | SNMP port |
| `community` | `String` | `"public"` | SNMP community string |

**Available data in the event (`event.data`)**

| Property | Description |
|----------|-------------|
| `hh3cEntityExtCpuUsage` | CPU usage as a percentage |
| `hh3cEntityExtMemUsage` | Memory usage as a percentage |
| `hh3cEntityExtUpTime` | Uptime in seconds |
| `hh3cEntityExtManuSerialNum` | Serial number |
| `hh3cEntityExtTemperature` | Switch temperature |
| `entPhysicalHardwareRev` | Hardware revision |
| `entPhysicalFirmwareRev` | Firmware revision |

```js
var snmp4 = new scSNMP.HPSystemMIB("192.168.1.20", "HP_Switch");
snmp4.getEventTarget().onDataAvailable = function(event)
{
    if(!event.error)
    {
        Debug.Print("CPU: " + event.data.hh3cEntityExtCpuUsage.value + "%");
        Debug.Print("Memory: " + event.data.hh3cEntityExtMemUsage.value + "%");
    }
}
```

---

## HPPortMIB

Retrieves per-port status from an HP switch.

**Parameters**

| Parameter | Type | Default value | Description |
|-----------|-----|---------------|-------------|
| `ipAddress` | `String` | *(required)* | IP address of the switch |
| `name` | `String` | `"<NONAME>"` | Name of the instance |
| `poll` | `Boolean` | `true` | `true` starts automatic polling |
| `interval` | `Number` | `3600000` (60 min) | Poll interval in milliseconds |
| `port` | `Number` | `161` | SNMP port |
| `community` | `String` | `"public"` | SNMP community string |
| `ports` | `Array<Number>` | `[1,2,3,4]` | Port indexes to monitor |

**Available data per port (`event.data["Port N"]`)**

| Property | Description |
|----------|-------------|
| `ifHighSpeed` | Port bandwidth in Mbit/s |
| `ifSpeed` | Port bandwidth in bit/s |
| `dot3StatsDuplexStatus` | Duplex mode: unknown, halfDuplex, fullDuplex |
| `hh3cIfStatFlowInBits` | Incoming traffic in bits per interval |
| `hh3cIfStatFlowOutBits` | Outgoing traffic in bits per interval |

```js
var snmp5 = new scSNMP.HPPortMIB("192.168.1.20", "HP_Ports", true, 60000, 161, "public", [1,2,3,4,5,6]);
snmp5.getEventTarget().onDataAvailable = function(event)
{
    if(!event.error)
        Debug.Print("Port 1 speed: " + event.data["Port 1"].ifHighSpeed.value + " Mbit/s");
}
```

---

## HPFanMIB

Retrieves fan status from an HP switch.

**Parameters**

| Parameter | Type | Default value | Description |
|-----------|-----|---------------|-------------|
| `ipAddress` | `String` | *(required)* | IP address of the switch |
| `name` | `String` | `"<NONAME>"` | Name of the instance |
| `fans` | `Array<Number>` | `[1,2]` | Fan indexes to monitor |
| `poll` | `Boolean` | `true` | `true` starts automatic polling |
| `interval` | `Number` | `3600000` (60 min) | Poll interval in milliseconds |
| `port` | `Number` | `161` | SNMP port |
| `community` | `String` | `"public"` | SNMP community string |

**Available data per fan (`event.data["Fan N"]`)**

| Property | Description |
|----------|-------------|
| `operStatus` | Operational status: Not Supported, Disabled, Enabled, Dangerous |
| `errorStatus` | Error status: Normal, Post failure, Fan error, etc. |

```js
var snmp6 = new scSNMP.HPFanMIB("192.168.1.20", "HP_Fans", [1,2]);
snmp6.getEventTarget().onDataAvailable = function(event)
{
    if(!event.error)
        Debug.Print("Fan 1: " + event.data["Fan 1"].operStatus.status);
}
```

---

## ArubaSystemMIB

Retrieves overall system status from an Aruba switch (tested on Aruba Instant On 1930).

**Parameters** – same as `HPSystemMIB`.

**Available data in the event (`event.data`)**

| Property | Description |
|----------|-------------|
| `rlPhdUnitEnvParamTempSensorValue` | Current temperature |
| `rlPhdUnitEnvParamTempSensorStatus` | Temperature status: Ok, Unavailable, Non-operational |
| `rlPhdUnitEnvParamMonitorTemperatureStatus` | Temperature alarm status |
| `rlCpuUtilDuringLastSecond` | CPU usage over the last second (%) |
| `rlCpuUtilDuringLastMinute` | CPU usage over the last minute (%) |
| `rlCpuUtilDuringLast5Minutes` | CPU usage over the last 5 minutes (%) |
| `rlPhdUnitGenParamModelName` | Model name |
| `rlPhdUnitGenParamSoftwareVersion` | Software version |
| `rlPhdUnitGenParamSerialNum` | Serial number |
| `sysUpTime` | Uptime (in 1/100 seconds) |
| `pethMainPsePower` | Total PoE capacity in Watts |
| `pethMainPseOperStatus` | PoE status: On, Off, Faulty |
| `pethMainPseConsumptionPower` | Current PoE consumption in Watts |

---

## ArubaFanMIB

Retrieves fan status from an Aruba switch. **Parameters** – same as `HPFanMIB`.

**Available data per fan (`event.data["Fan N"]`)**

| Property | Description |
|----------|-------------|
| `fanStatus` | Status: Normal, Warning, Critical, Shutdown, Not present, Not functioning |
| `fanSpeed` | Fan speed (raw value) |

---

## ArubaPortMIB

Retrieves per-port status from an Aruba switch. **Parameters** – same as `HPPortMIB`.

**Available data per port (`event.data["Port N"]`)**

| Property | Description |
|----------|-------------|
| `ifHighSpeed` | Speed in Mbit/s |
| `dot3StatsDuplexStatus` | Duplex mode |
| `ifAdminStatus` | Administrative status: Up, Down, Testing |
| `ifOperStatus` | Operational status: Up, Down, Testing |

---

## ArubaPoeMIB

Retrieves per-port PoE status from an Aruba switch.

**Parameters** – same as `HPPortMIB`.

**Available data per port (`event.data["Port N"]`)**

| Property | Description |
|----------|-------------|
| `rlPethPsePortOutputVoltage` | Output voltage in millivolts |
| `rlPethPsePortOutputCurrent` | Output current in milliamps |
| `rlPethPsePortOutputPower` | Output power in milliwatts |
| `rlPethPsePortPowerLimit` | Configured power limit in milliwatts |
| `rlPethPsePortOperStatus` | Whether the port is active (True/False) |
| `rlPethPsePortLinkPartnerPoeType` | PoE type of the connected device |

---

## The script

<a href="scSNMP.js" download="scSNMP.js" class="md-button md-button--primary">Download scSNMP.js</a>

```js
--8<-- "losningar/scsnmp/scSNMP.js"
```
