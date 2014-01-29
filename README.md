WikiScraper.js
========

Get data off Wikipedia.
Fast.


```bash
./cli.js --sites '["Helium", "Hydrogen", "Oxygen", "Lithium"]'
```

# About

The DOM scraper does not yet work well in Wikipedia's
quirky layout.
This tool is for now aimed at the more technical pages, which
feature a little "infobox".

I made it for use with [Mendeleev.io](https://github.com/zpiman/Mendeleev.io)).

# Usage in JavaScript

```javascript
var WikiScraper = require("wikiscraper.js");

var wikiscraper = new WikiScraper([
  "Helium",
  "Hydrogen",
  "Oxygen",
  "Lithium"
]);

wikiscraper.scrape(function(err, results) {
  results.forEach(console.dir);
});
```
