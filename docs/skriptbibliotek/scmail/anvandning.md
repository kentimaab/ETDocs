# scMail – Användning

`scMail` är ett självkörande skriptbibliotek och behöver ingen styrning från huvudskriptet. Konfigurationen görs via konstanter i skriptet.

## Konfiguration

Följande konstanter kan justeras direkt i skriptet:

| Konstant | Standardvärde | Beskrivning |
|----------|---------------|-------------|
| `MAILNAME` | `"Mail1"` | Namnet på e-postobjektet i `DataStore`. Måste matcha exakt. |
| `SEVERITY` | `10` | Allvarlighetsgrad för larmfiltrering. Används om du väljer att filtrera på svårighetsgrad. |
| `CHECK_INTERVAL` | `10000` | Hur ofta larmsatusförändringar kontrolleras, i millisekunder. `10000` = 10 sekunder. |
| `ACTIVATEDMAILHEADER` | `"The following alarms have been activated:"` | Rubrik i e-postmeddelandet vid larmaktivering. |
| `INACTIVATEDMAILHEADER` | `"The following alarms have been inactivated:"` | Rubrik i e-postmeddelandet vid larmåterställning. |
| `ACTIVEMAILHEADER` | `"The following alarms are active:"` | Rubrik för listan över fortfarande aktiva larm. |

## Larmval

Skriptet hämtar larm via `scExtensions.FindAllAlarms`. Välj ett av de två alternativen i skriptet:

```js
// Hämta alla larm (standard)
scExtensions.FindAllAlarms(alarms, "", DataStore);

// Hämta bara larm med specifik allvarlighetsgrad (SEVERITY)
scExtensions.FindAllAlarms(alarms, "", DataStore, SEVERITY);
```

## E-postmeddelandets innehåll

Vid en larmhändelse byggs e-postets brödtext upp av:

1. En rubrik som beskriver vad som hänt (aktiverade eller inaktiverade larm)
2. En lista med namnen på de berörda larmen
3. En sammanfattning av alla larm som fortfarande är aktiva

**Exempel på e-postinnehåll:**

```
The following alarms have been activated:

DataStore.Larm.Rörelse_Entré

The following alarms are active:

DataStore.Larm.Rörelse_Entré
DataStore.Larm.Dörr_öppen
```

---

## Skriptet

<a href="scMail.js" download="scMail.js" class="md-button md-button--primary">Ladda ner scMail.js</a>

```js
--8<-- "skriptbibliotek/scmail/scMail.js"
```
