# scSNMP – Användning

Alla funktioner i `scSNMP` skapar händelsedrivna övervakningsobjekt. Objekten pollar enheten med ett konfigurerbart intervall och skickar en händelse till huvudskriptet varje gång ny data har hämtats.

---

## SynologySystemMIB

Hämtar övergripande systemstatus från en Synology NAS.

**Parametrar**

| Parameter | Typ | Standardvärde | Beskrivning |
|-----------|-----|---------------|-------------|
| `ipAddress` | `String` | *(obligatorisk)* | IP-adress till NAS-enheten |
| `name` | `String` | `"<NONAME>"` | Namn på instansen |
| `poll` | `Boolean` | `true` | `true` startar automatisk polling |
| `interval` | `Number` | `3600000` (60 min) | Pollintervall i millisekunder |
| `port` | `Number` | `161` | SNMP-port |
| `community` | `String` | `"public"` | SNMP community string |

**Tillgänglig data i händelsen (`event.data`)**

| Egenskap | Beskrivning |
|----------|-------------|
| `systemStatus` | Systemstatus: Normal, Failed |
| `temperature` | Systemtemperatur i Celsius |
| `powerStatus` | Strömförsörjningsstatus |
| `systemFanStatus` | Systemfläktarnas status |
| `cpuFanStatus` | CPU-fläktarnas status |
| `modelName` | Modellnamn |
| `serialNumber` | Serienummer |
| `version` | DSM-version |
| `upgradeAvailable` | Om DSM-uppdatering finns tillgänglig |
| `ssCpuSystem` | CPU-användning i procent |
| `memTotalReal` | Totalt RAM |
| `memAvailReal` | Ledigt RAM |
| `memCached` | Cachat minne |

```js
var snmp1 = new scSNMP.SynologySystemMIB("192.168.1.10", "NAS_Ethiris");
snmp1.getEventTarget().onDataAvailable = function(event)
{
    if(!event.error)
    {
        Debug.Print("NAS systemstatus: " + event.data.systemStatus.status);
        Debug.Print("NAS temperatur: " + event.data.temperature.value + "°C");
    }
    else
        Debug.Print("Fel vid SNMP-hämtning: " + event.errorMessage);
}
```

---

## SynologyDiskMIB

Hämtar status per disk från en Synology NAS.

**Parametrar**

| Parameter | Typ | Standardvärde | Beskrivning |
|-----------|-----|---------------|-------------|
| `ipAddress` | `String` | *(obligatorisk)* | IP-adress till NAS-enheten |
| `name` | `String` | `"<NONAME>"` | Namn på instansen |
| `disks` | `Array<Number>` | `[1,2,3,4,5,6,7,8]` | Lista över diskindex att övervaka |
| `poll` | `Boolean` | `true` | `true` startar automatisk polling |
| `interval` | `Number` | `3600000` (60 min) | Pollintervall i millisekunder |
| `port` | `Number` | `161` | SNMP-port |
| `community` | `String` | `"public"` | SNMP community string |

**Tillgänglig data per disk (`event.data["Disk N"]`)**

| Egenskap | Beskrivning |
|----------|-------------|
| `diskStatus` | Normal, Initialized, Crashed osv. |
| `diskHealthStatus` | Normal, Warning, Critical, Failing |
| `diskTemperature` | Disktemperatur i Celsius |
| `diskModel` | Diskmodell |
| `diskRemainLife` | Uppskattad återstående livslängd |
| `diskBadSector` | Antal defekta sektorer |

```js
var snmp2 = new scSNMP.SynologyDiskMIB("192.168.1.10", "NAS_Diskar", [1,2,3,4]);
snmp2.getEventTarget().onDataAvailable = function(event)
{
    if(!event.error)
    {
        Debug.Print("Disk 1 status: " + event.data["Disk 1"].diskStatus.status);
        Debug.Print("Disk 1 temperatur: " + event.data["Disk 1"].diskTemperature.value + "°C");
    }
}
```

---

## SynologySystemTemperatureCheck

Händelsedriven temperaturövervakning för Synology NAS. Skickar en händelse när temperaturen passerar ett konfigurerat gränsvärde i någon riktning.

**Parametrar**

| Parameter | Typ | Standardvärde | Beskrivning |
|-----------|-----|---------------|-------------|
| `ipAddress` | `String` | *(obligatorisk)* | IP-adress till NAS-enheten |
| `limit` | `Number` | `50` | Temperaturgränsvärde i Celsius |
| `name` | `String` | `"<NONAME>"` | Namn på instansen |
| `port` | `Number` | `161` | SNMP-port |
| `community` | `String` | `"public"` | SNMP community string |
| `interval` | `Number` | `10000` | Kontrollintervall i millisekunder |

**Händelseegenskaper**

| Egenskap | Typ | Beskrivning |
|----------|-----|-------------|
| `event.isAboveLimit` | `Boolean` | `true` om temperaturen överstiger gränsvärdet |
| `event.isBelowLimit` | `Boolean` | `true` om temperaturen understiger gränsvärdet |
| `event.currentTemperature` | `Number` | Aktuell temperatur i Celsius |
| `event.limit` | `Number` | Konfigurerat gränsvärde |

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

Hämtar övergripande systemstatus från en HP-switch (testat på HPE OfficeConnect 1950).

**Parametrar**

| Parameter | Typ | Standardvärde | Beskrivning |
|-----------|-----|---------------|-------------|
| `ipAddress` | `String` | *(obligatorisk)* | IP-adress till switchen |
| `name` | `String` | `"<NONAME>"` | Namn på instansen |
| `poll` | `Boolean` | `true` | `true` startar automatisk polling |
| `interval` | `Number` | `3600000` (60 min) | Pollintervall i millisekunder |
| `port` | `Number` | `161` | SNMP-port |
| `community` | `String` | `"public"` | SNMP community string |

**Tillgänglig data i händelsen (`event.data`)**

| Egenskap | Beskrivning |
|----------|-------------|
| `hh3cEntityExtCpuUsage` | CPU-användning i procent |
| `hh3cEntityExtMemUsage` | Minnesanvändning i procent |
| `hh3cEntityExtUpTime` | Drifttid i sekunder |
| `hh3cEntityExtManuSerialNum` | Serienummer |
| `hh3cEntityExtTemperature` | Switchtemperatur |
| `entPhysicalHardwareRev` | Hårdvaruversion |
| `entPhysicalFirmwareRev` | Firmwareversion |

```js
var snmp4 = new scSNMP.HPSystemMIB("192.168.1.20", "HP_Switch");
snmp4.getEventTarget().onDataAvailable = function(event)
{
    if(!event.error)
    {
        Debug.Print("CPU: " + event.data.hh3cEntityExtCpuUsage.value + "%");
        Debug.Print("Minne: " + event.data.hh3cEntityExtMemUsage.value + "%");
    }
}
```

---

## HPPortMIB

Hämtar portstatus per port från en HP-switch.

**Parametrar**

| Parameter | Typ | Standardvärde | Beskrivning |
|-----------|-----|---------------|-------------|
| `ipAddress` | `String` | *(obligatorisk)* | IP-adress till switchen |
| `name` | `String` | `"<NONAME>"` | Namn på instansen |
| `poll` | `Boolean` | `true` | `true` startar automatisk polling |
| `interval` | `Number` | `3600000` (60 min) | Pollintervall i millisekunder |
| `port` | `Number` | `161` | SNMP-port |
| `community` | `String` | `"public"` | SNMP community string |
| `ports` | `Array<Number>` | `[1,2,3,4]` | Portindex att övervaka |

**Tillgänglig data per port (`event.data["Port N"]`)**

| Egenskap | Beskrivning |
|----------|-------------|
| `ifHighSpeed` | Portens bandbredd i Mbit/s |
| `ifSpeed` | Portens bandbredd i bit/s |
| `dot3StatsDuplexStatus` | Duplexläge: unknown, halfDuplex, fullDuplex |
| `hh3cIfStatFlowInBits` | Inkommande trafik i bits per intervall |
| `hh3cIfStatFlowOutBits` | Utgående trafik i bits per intervall |

```js
var snmp5 = new scSNMP.HPPortMIB("192.168.1.20", "HP_Portar", true, 60000, 161, "public", [1,2,3,4,5,6]);
snmp5.getEventTarget().onDataAvailable = function(event)
{
    if(!event.error)
        Debug.Print("Port 1 hastighet: " + event.data["Port 1"].ifHighSpeed.value + " Mbit/s");
}
```

---

## HPFanMIB

Hämtar fläktstatus från en HP-switch.

**Parametrar**

| Parameter | Typ | Standardvärde | Beskrivning |
|-----------|-----|---------------|-------------|
| `ipAddress` | `String` | *(obligatorisk)* | IP-adress till switchen |
| `name` | `String` | `"<NONAME>"` | Namn på instansen |
| `fans` | `Array<Number>` | `[1,2]` | Fläktindex att övervaka |
| `poll` | `Boolean` | `true` | `true` startar automatisk polling |
| `interval` | `Number` | `3600000` (60 min) | Pollintervall i millisekunder |
| `port` | `Number` | `161` | SNMP-port |
| `community` | `String` | `"public"` | SNMP community string |

**Tillgänglig data per fläkt (`event.data["Fan N"]`)**

| Egenskap | Beskrivning |
|----------|-------------|
| `operStatus` | Driftstatus: Not Supported, Disabled, Enabled, Dangerous |
| `errorStatus` | Felstatus: Normal, Post failure, Fan error osv. |

```js
var snmp6 = new scSNMP.HPFanMIB("192.168.1.20", "HP_Fläktar", [1,2]);
snmp6.getEventTarget().onDataAvailable = function(event)
{
    if(!event.error)
        Debug.Print("Fläkt 1: " + event.data["Fan 1"].operStatus.status);
}
```

---

## ArubaSystemMIB

Hämtar övergripande systemstatus från en Aruba-switch (testat på Aruba Instant On 1930).

**Parametrar** – samma som `HPSystemMIB`.

**Tillgänglig data i händelsen (`event.data`)**

| Egenskap | Beskrivning |
|----------|-------------|
| `rlPhdUnitEnvParamTempSensorValue` | Aktuell temperatur |
| `rlPhdUnitEnvParamTempSensorStatus` | Temperaturstatus: Ok, Unavailable, Non-operational |
| `rlPhdUnitEnvParamMonitorTemperatureStatus` | Temperaturlarmsstatus |
| `rlCpuUtilDuringLastSecond` | CPU senaste sekunden (%) |
| `rlCpuUtilDuringLastMinute` | CPU senaste minuten (%) |
| `rlCpuUtilDuringLast5Minutes` | CPU senaste 5 minuterna (%) |
| `rlPhdUnitGenParamModelName` | Modellnamn |
| `rlPhdUnitGenParamSoftwareVersion` | Programvaruversion |
| `rlPhdUnitGenParamSerialNum` | Serienummer |
| `sysUpTime` | Drifttid (i 1/100 sekunder) |
| `pethMainPsePower` | Total PoE-kapacitet i Watt |
| `pethMainPseOperStatus` | PoE-status: On, Off, Faulty |
| `pethMainPseConsumptionPower` | Aktuell PoE-förbrukning i Watt |

---

## ArubaFanMIB

Hämtar fläktstatus från en Aruba-switch. **Parametrar** – samma som `HPFanMIB`.

**Tillgänglig data per fläkt (`event.data["Fan N"]`)**

| Egenskap | Beskrivning |
|----------|-------------|
| `fanStatus` | Status: Normal, Warning, Critical, Shutdown, Not present, Not functioning |
| `fanSpeed` | Fläkthastighet (råvärde) |

---

## ArubaPortMIB

Hämtar portstatus per port från en Aruba-switch. **Parametrar** – samma som `HPPortMIB`.

**Tillgänglig data per port (`event.data["Port N"]`)**

| Egenskap | Beskrivning |
|----------|-------------|
| `ifHighSpeed` | Hastighet i Mbit/s |
| `dot3StatsDuplexStatus` | Duplexläge |
| `ifAdminStatus` | Administrativ status: Up, Down, Testing |
| `ifOperStatus` | Operativ status: Up, Down, Testing |

---

## ArubaPoeMIB

Hämtar PoE-status per port från en Aruba-switch.

**Parametrar** – samma som `HPPortMIB`.

**Tillgänglig data per port (`event.data["Port N"]`)**

| Egenskap | Beskrivning |
|----------|-------------|
| `rlPethPsePortOutputVoltage` | Utspänning i millivolt |
| `rlPethPsePortOutputCurrent` | Utström i milliampere |
| `rlPethPsePortOutputPower` | Uteffekt i milliwatt |
| `rlPethPsePortPowerLimit` | Konfigurerat effektgränsvärde i milliwatt |
| `rlPethPsePortOperStatus` | Om porten är aktiv (True/False) |
| `rlPethPsePortLinkPartnerPoeType` | Ansluten enhets PoE-typ |

---

## Skriptet

<a href="scSNMP.js" download="scSNMP.js" class="md-button md-button--primary">Ladda ner scSNMP.js</a>

```js
--8<-- "skriptbibliotek/scsnmp/scSNMP.js"
```
