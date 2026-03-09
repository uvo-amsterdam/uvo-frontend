# Match Fixture Table – Data Retrieval Summary

## Overview

The match fixture table on the home page is populated by fetching a live **Excel (.xlsx) file** from the **Nevobo public API** and parsing it server-side before sending the rows to the frontend.

---

## Data Source

The data comes from Nevobo (the Dutch volleyball federation). Two endpoint patterns are used:

| Use case | URL |
|---|---|
| All upcoming matches (home page) | `https://api.nevobo.nl/export/vereniging/CKL7K23/programma.xlsx` |
| Specific team results | `https://api.nevobo.nl/export/team/CKL7K23/{gender}/{teamNumber}/resultaten.xlsx` |

- `CKL7K23` is the **club ID** for UvO Amsterdam on Nevobo.
- `{gender}` is either `heren` (men) or `dames` (women), derived from the first character of the team code (`H` → `heren`, anything else → `dames`).
- `{teamNumber}` is the numeric part of the team code (e.g., `H1` → gender=`heren`, number=`1`).

---

## Server-Side Processing (`Server.js`)

The backend is a **Node.js / Express** server. The relevant endpoint is:

```
GET /api/getFeed/:team
```

- If `:team` is `"all"`, it fetches the full club programme (used by the home page).
- Otherwise, it parses the team code to build a team-specific results URL.

Steps performed server-side:
1. Fetch the `.xlsx` file from Nevobo using `axios` with `responseType: 'arraybuffer'`.
2. Parse the binary buffer using the `xlsx` (SheetJS) npm package.
3. Read the first sheet and convert it to a 2D array of rows using `XLSX.utils.sheet_to_json(sheet, { header: 1 })`.
4. Return the raw rows array as JSON to the client.

Key dependencies: `axios`, `xlsx` (SheetJS).

---

## Client-Side Usage (`Index.js`)

```js
axios.get(`{host}/api/getFeed/all`)
  .then(response => {
    setFeedData(response.data.slice(1, 12)); // skip header row, take next 11
  });
```

- Row `0` is the header row from the Excel file and is skipped with `slice(1, 12)`.
- Rows `1–11` (up to 11 fixtures) are displayed.

---

## Row Data Structure

Each row is an array. The columns used from the Nevobo programme export are:

| Index | Field | Notes |
|---|---|---|
| `[0]` | Date | Excel serial number (days since 1900-01-01) |
| `[1]` | Time | Excel serial number (fraction of a day) |
| `[2]` | Home team name | String |
| `[3]` | Away team name | String |
| `[10]` | Hall / venue name | String |
| `[11]` | City / place | String |

---

## Date & Time Conversion

Nevobo stores dates and times as **Excel serial numbers**. The formula to convert to a JavaScript `Date` is:

```js
new Date((serialNumber - 25569) * 86400000)
```

- `25569` is the number of days between 1900-01-01 (Excel epoch) and 1970-01-01 (Unix epoch).
- `86400000` converts days to milliseconds.

For the **date** display:
```js
const date = new Date((item[0] - 25569) * 86400000);
const day   = date.getDate();
const month = date.getMonth() + 1;
```

For the **time** display:
```js
const hours   = new Date((item[1] - 25569) * 86400000).getHours() - 1; // -1 for timezone offset
const minutes = new Date((item[1] - 25569) * 86400000).getMinutes().toString().padStart(2, '0');
```
If `hours` equals `-1`, the match is shown as `"Moved"` (postponed/cancelled).

---

## Summary for a New Implementation

To recreate this in a new stack:

1. **Make an HTTP GET request** (server-side, to avoid CORS) to:
   `https://api.nevobo.nl/export/vereniging/CKL7K23/programma.xlsx`

2. **Parse the response** as an Excel file (e.g., SheetJS in Node/Python's `openpyxl`, etc.) and convert to rows.

3. **Expose a JSON API endpoint** that returns those rows to the frontend.

4. On the frontend, **skip the first row** (header) and map the remaining rows using the column indices above.

5. **Convert date/time values** from Excel serial numbers using the formula above.

6. Optionally **highlight UvO team names** (check if the string includes `"UvO"`).
