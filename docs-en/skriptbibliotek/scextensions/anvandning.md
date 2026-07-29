# scExtensions – Usage

## Math.calculateAverage

Calculates the average of an array of numbers.

**Parameters**

| Parameter | Type | Description |
|-----------|-----|-------------|
| `ary` | `Array<Number>` | Array of numbers to calculate the average for |

**Return value:** `Number` – the average, or `0` if the array is empty.

```js
var values = [10, 20, 30];
var avg = Math.calculateAverage(values); // Returns 20
```

---

## Math.isOdd

Checks whether a number is odd.

**Parameters**

| Parameter | Type | Description |
|-----------|-----|-------------|
| `value` | `Number` | The number to check |

**Return value:** `Boolean` – `true` if the value is odd, otherwise `false`.

```js
Math.isOdd(3); // true
Math.isOdd(4); // false
```

---

## Math.isEven

Checks whether a number is even.

**Parameters**

| Parameter | Type | Description |
|-----------|-----|-------------|
| `value` | `Number` | The number to check |

**Return value:** `Boolean` – `true` if the value is even, otherwise `false`.

```js
Math.isEven(4); // true
Math.isEven(3); // false
```

---

## String.prototype.split

Splits a string at a specified delimiter and returns an array of the parts.

**Parameters**

| Parameter | Type | Description |
|-----------|-----|-------------|
| `delimiter` | `String` | The delimiter to split the string at |

**Return value:** `Array<String>` – an array containing the parts of the string.

```js
var parts = "kamera1,kamera2,kamera3".split(",");
// Returns ["kamera1", "kamera2", "kamera3"]
```

---

## FindAllAlarms

Recursively searches through an object (typically `DataStore`) and collects all alarms.

**Parameters**

| Parameter | Type | Description |
|-----------|-----|-------------|
| `alarms` | `Array` | Empty array that will be populated with the alarms found |
| `parent` | `String` | Starting string for the path – specify `""` |
| `obj` | `Object` | The object to search through, typically `DataStore` |
| `severity` | `Number` *(optional)* | Filter by a specific severity level. Omit to retrieve all alarms. |

```js
var alarms = new Array();

// Get all alarms
scExtensions.FindAllAlarms(alarms, "", DataStore);

// Get only alarms with severity level 10
scExtensions.FindAllAlarms(alarms, "", DataStore, 10);
```

Each element in the `alarms` array has the following structure:

| Property | Type | Description |
|----------|-----|-------------|
| `Alarm` | `Object` | Reference to the alarm object |
| `Name` | `String` | The path to the alarm in `DataStore` |
| `Active` | `Boolean` | Last known active status |

---

## msLeftUntilMidnight

Returns the number of milliseconds until midnight, based on the system clock.

**Return value:** `Number` – milliseconds remaining until midnight.

```js
var ms = scExtensions.msLeftUntilMidnight();
// Start a timer that expires at midnight
myTimer.start(ms);
```

---

## bytesToSize

Converts a byte value into a human-readable string with an automatically selected unit.

**Parameters**

| Parameter | Type | Description |
|-----------|-----|-------------|
| `bytes` | `Number` | The number of bytes to convert |

**Return value:** `String` – the formatted value with a unit, e.g. `"5.00 MiB"`.

```js
scExtensions.bytesToSize(5242880);    // "5.00 MiB"
scExtensions.bytesToSize(1073741824); // "1.00 GiB"
scExtensions.bytesToSize(0);          // "0 B"
```

---

## The script

<a href="scExtensions.js" download="scExtensions.js" class="md-button md-button--primary">Download scExtensions.js</a>

```js
--8<-- "skriptbibliotek/scextensions/scExtensions.js"
```
