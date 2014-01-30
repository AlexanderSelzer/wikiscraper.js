WikiScraper.js
========

Get data off Wikipedia.
Fast.


```bash
node cli.js --sites '["Helium", "Hydrogen", "Oxygen", "Lithium"]'
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

# Example - Scraping Wikipedia fields to a RethinkDB database

scrape-to-db.js

```javascript
var r = require("rethinkdb"),
    WikiScraper = require("./index.js"),
    fs = require("fs");

r.connect({
  host: "localhost",
  db: "wikipedia"
}, function(err, conn) {
  fs.readFile("elements.json", function(err, data) {
    var json = data.toString().replace(/'/g, '"');
    var wikiscraper = new WikiScraper(JSON.parse(json));

    wikiscraper.scrape(function(err, site) {
      if (err) throw err;
      console.log("Writing site", site.title, "to DB.");
      r.table("sites").insert(site).run(conn, function(err) {
        if (err) throw err;
      });
    });
  });
});
```
