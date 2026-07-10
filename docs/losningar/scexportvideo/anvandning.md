# scExportVideo – Användning

## Init

Initierar skriptet med en exportmapp och en lista med larmobjekt att bevaka. Anropas en gång vid uppstart.

**Parametrar**

| Parameter | Typ | Beskrivning |
|-----------|-----|-------------|
| `path` | `String` | Sökväg till mappen där videofiler ska exporteras |
| `oAlarms` | `Array` | Array med larmobjekt att bevaka |
| `bExportWhenAcked` | `Boolean` | `true` = exportera när larmet kvitteras, `false` = exportera direkt när larmet inaktiveras |

```js
var init;
if(init == undefined)
{
    init = true;

    scExportVideo.Init(
        "C:\\Ethiris\\Export",              // Exportmapp
        [DataStore.Larm.Intrång_Entré,      // Larm 1
         DataStore.Larm.Rörelse_Parkering], // Larm 2
        false                               // Exportera direkt när larmet inaktiveras
    );
}
```

---

## SetErrorAlarmObject

Kopplar ett larmobjekt i Ethiris som aktiveras om en videoexport misslyckas. Larmet återställs automatiskt när nästa export lyckas.

**Parametrar**

| Parameter | Typ | Beskrivning |
|-----------|-----|-------------|
| `alarmObject` | `Object` | Referens till ett larmobjekt i `DataStore` |

```js
scExportVideo.SetErrorAlarmObject(DataStore.Larm.ExportFel);
```

---

## Exportens filnamn

Varje exportfil namnges efter tidpunkten när larmet aktiverades:

```
C:\Ethiris\Export\2024-06-18 14:32:05.ethe
```

---

## Tidpunkt för exporten

Skriptet tar automatiskt hänsyn till kamerornas konfigurerade pre- och postalarmstider. Om en kamera är inställd på 30 sekunders prealarm och 60 sekunders postalarm, väntar skriptet tills postalarmet har löpt ut innan exporten påbörjas — annars skulle slutet av sekvensen saknas.

!!! tip "Flera kameror per larm"
    Om ett larm är kopplat till flera kameror används den längsta pre- och postalarmstiden bland alla berörda kameror som referens.

---

## Fullständigt exempel

```js
var init;
if(init == undefined)
{
    init = true;

    // Initiera med exportmapp och larmlista
    scExportVideo.Init(
        "C:\\Ethiris\\Export",
        [DataStore.Larm.Intrång_Entré],
        false
    );

    // Koppla ett feillarm för exportfel (valfritt)
    scExportVideo.SetErrorAlarmObject(DataStore.Larm.ExportFel);
}
```

---

## Skriptet

<a href="scExportVideo.js" download="scExportVideo.js" class="md-button md-button--primary">Ladda ner scExportVideo.js</a>

```js
--8<-- "losningar/scexportvideo/scExportVideo.js"
```
