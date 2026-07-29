# scFile – Användning

## writeTo

Skriver en tidsstämplad rad till en fil. Raden läggs till i slutet av filen.

**Parametrar**

| Parameter | Typ | Beskrivning |
|-----------|-----|-------------|
| `string` | `String` | Texten som ska skrivas |
| `path` | `String` *(valfri)* | Sökväg till filen. Används skriptets standardvärde om det utelämnas. |
| `creation` | `Constant` *(valfri)* | Hur filen ska öppnas/skapas. Standardvärde är `OPEN_ALWAYS`. Möjliga värden: `CREATE_NEW`, `CREATE_ALWAYS`, `OPEN_EXISTING`, `OPEN_ALWAYS`, `TRUNCATE_EXISTING`. |

Varje rad som skrivs formateras automatiskt som:

```
YYYY-MM-DD HH:mm:ss.zzz - <din text>
```

**Exempel**

```js
// Använd standardsökvägen
scFile.writeTo("Rörelselarm aktiverat");

// Ange egen sökväg
scFile.writeTo("Temperaturgräns nådd", "C:/Ethiris/Log/temperatur.txt");
```

---

## readFrom

Läser hela innehållet i en fil och returnerar det som en sträng.

**Parametrar**

| Parameter | Typ | Beskrivning |
|-----------|-----|-------------|
| `path` | `String` *(valfri)* | Sökväg till filen. Används skriptets standardvärde om det utelämnas. |

**Returvärde:** `String` – filens hela innehåll.

!!! warning "Filen måste finnas"
    `readFrom` öppnar filen med `OPEN_EXISTING`. Om filen inte finns uppstår ett fel som loggas i Debug-panelen.

```js
// Läs från standardsökvägen
var content = scFile.readFrom();

// Läs från specifik fil
var content = scFile.readFrom("C:/Ethiris/Log/temperatur.txt");

Debug.Print(content);
```

---

## Skriptet

<a href="scFile.js" download="scFile.js" class="md-button md-button--primary">Ladda ner scFile.js</a>

```js
--8<-- "skriptbibliotek/scfile/scFile.js"
```
