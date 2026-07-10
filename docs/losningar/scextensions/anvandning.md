# scExtensions – Användning

## Math.calculateAverage

Beräknar medelvärdet för en array av tal.

**Parametrar**

| Parameter | Typ | Beskrivning |
|-----------|-----|-------------|
| `ary` | `Array<Number>` | Array med tal att beräkna medelvärdet för |

**Returvärde:** `Number` – medelvärdet, eller `0` om arrayen är tom.

```js
var values = [10, 20, 30];
var avg = Math.calculateAverage(values); // Returnerar 20
```

---

## Math.isOdd

Kontrollerar om ett tal är udda.

**Parametrar**

| Parameter | Typ | Beskrivning |
|-----------|-----|-------------|
| `value` | `Number` | Talet som ska kontrolleras |

**Returvärde:** `Boolean` – `true` om värdet är udda, annars `false`.

```js
Math.isOdd(3); // true
Math.isOdd(4); // false
```

---

## Math.isEven

Kontrollerar om ett tal är jämnt.

**Parametrar**

| Parameter | Typ | Beskrivning |
|-----------|-----|-------------|
| `value` | `Number` | Talet som ska kontrolleras |

**Returvärde:** `Boolean` – `true` om värdet är jämnt, annars `false`.

```js
Math.isEven(4); // true
Math.isEven(3); // false
```

---

## String.prototype.split

Delar upp en sträng vid en angiven avgränsare och returnerar en array med delarna.

**Parametrar**

| Parameter | Typ | Beskrivning |
|-----------|-----|-------------|
| `delimiter` | `String` | Avgränsaren som strängen ska delas vid |

**Returvärde:** `Array<String>` – en array med delarna av strängen.

```js
var parts = "kamera1,kamera2,kamera3".split(",");
// Returnerar ["kamera1", "kamera2", "kamera3"]
```

---

## FindAllAlarms

Söker rekursivt igenom ett objekt (vanligtvis `DataStore`) och samlar ihop alla larm.

**Parametrar**

| Parameter | Typ | Beskrivning |
|-----------|-----|-------------|
| `alarms` | `Array` | Tom array som fylls på med hittade larm |
| `parent` | `String` | Startsträng för sökvägen – ange `""` |
| `obj` | `Object` | Objektet att söka igenom, vanligtvis `DataStore` |
| `severity` | `Number` *(valfri)* | Filtrera på specifik allvarlighetsgrad. Utelämna för att hämta alla larm. |

```js
var alarms = new Array();

// Hämta alla larm
scExtensions.FindAllAlarms(alarms, "", DataStore);

// Hämta bara larm med allvarlighetsgrad 10
scExtensions.FindAllAlarms(alarms, "", DataStore, 10);
```

Varje element i `alarms`-arrayen har följande struktur:

| Egenskap | Typ | Beskrivning |
|----------|-----|-------------|
| `Alarm` | `Object` | Referens till larmobjektet |
| `Name` | `String` | Sökvägen till larmet i `DataStore` |
| `Active` | `Boolean` | Senast kända aktivt-status |

---

## msLeftUntilMidnight

Returnerar antalet millisekunder tills midnatt, baserat på systemklockan.

**Returvärde:** `Number` – millisekunder kvar till midnatt.

```js
var ms = scExtensions.msLeftUntilMidnight();
// Starta timer som löper ut vid midnatt
myTimer.start(ms);
```

---

## bytesToSize

Konverterar ett bytevärde till en läsbar sträng med automatiskt vald enhet.

**Parametrar**

| Parameter | Typ | Beskrivning |
|-----------|-----|-------------|
| `bytes` | `Number` | Antalet bytes att konvertera |

**Returvärde:** `String` – formaterat värde med enhet, t.ex. `"5.00 MiB"`.

```js
scExtensions.bytesToSize(5242880);    // "5.00 MiB"
scExtensions.bytesToSize(1073741824); // "1.00 GiB"
scExtensions.bytesToSize(0);          // "0 B"
```

---

## Skriptet

<a href="scExtensions.js" download="scExtensions.js" class="md-button md-button--primary">Ladda ner scExtensions.js</a>

```js
--8<-- "losningar/scextensions/scExtensions.js"
```
