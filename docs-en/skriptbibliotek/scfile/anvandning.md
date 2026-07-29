# scFile – Usage

## writeTo

Writes a timestamped line to a file. The line is appended to the end of the file.

**Parameters**

| Parameter | Type | Description |
|-----------|-----|-------------|
| `string` | `String` | The text to be written |
| `path` | `String` *(optional)* | Path to the file. The script's default value is used if omitted. |
| `creation` | `Constant` *(optional)* | How the file should be opened/created. The default value is `OPEN_ALWAYS`. Possible values: `CREATE_NEW`, `CREATE_ALWAYS`, `OPEN_EXISTING`, `OPEN_ALWAYS`, `TRUNCATE_EXISTING`. |

Every line written is automatically formatted as:

```
YYYY-MM-DD HH:mm:ss.zzz - <your text>
```

**Example**

```js
// Use the default path
scFile.writeTo("Motion alarm activated");

// Specify a custom path
scFile.writeTo("Temperature threshold reached", "C:/Ethiris/Log/temperature.txt");
```

---

## readFrom

Reads the entire contents of a file and returns it as a string.

**Parameters**

| Parameter | Type | Description |
|-----------|-----|-------------|
| `path` | `String` *(optional)* | Path to the file. The script's default value is used if omitted. |

**Return value:** `String` – the entire contents of the file.

!!! warning "The file must exist"
    `readFrom` opens the file with `OPEN_EXISTING`. If the file does not exist, an error occurs which is logged in the Debug panel.

```js
// Read from the default path
var content = scFile.readFrom();

// Read from a specific file
var content = scFile.readFrom("C:/Ethiris/Log/temperature.txt");

Debug.Print(content);
```

---

## The script

<a href="scFile.js" download="scFile.js" class="md-button md-button--primary">Download scFile.js</a>

```js
--8<-- "skriptbibliotek/scfile/scFile.js"
```
