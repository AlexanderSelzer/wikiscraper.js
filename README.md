WikiScraper.js
========

Get data off Wikipedia.
Fast.


```bash
node cli.js --sites '["Helium", "Hydrogen", "Oxygen", "Lithium"]'
```

# About

This tool will get the contents of Wikipedia's infobox (.infobox class),
as a key-value JavaScript object.

It was made for use with [Mendeleev.io](https://github.com/zpiman/Mendeleev.io)).

# Usage in JavaScript

WikiScraper should initialized with a array of pages on Wikipedia.
`new WikiScraper(["JavaScript"])` or `WikiScraper.selectSites(["JavaScript"])`
This will translate to the URL `en.wikipedia.org/wiki/JavaScript`

The language of the page can be changed.
`WikiScraper.setLanguage("de")` will scrape `de.wikipedia.org/wiki/JavaScript`.

For every request, the callback will be called.
This allows faster processing and is more secure than returning
a big array.

```javascript
var WikiScraper = require("wikiscraper.js");

var wikiscraper = new WikiScraper([
  "Helium",
  "Hydrogen",
  "Oxygen",
  "Lithium"
]);

var results = [];

wikiscraper.scrape(function(err, result) {
  if (!err)
    results.push(result);
});

console.dir(results);
```

# Example - Scraping Wikipedia fields to a RethinkDB database

`scrape-to-db.js` (uses `elements.json`)

```javascript
var r = require("rethinkdb"),
    WikiScraper = require("./index.js"),
    fs = require("fs");

r.connect({
  host: "localhost",
  db: "wikipedia"
}, function(err, conn) {
  fs.readFile("elements.json", function(err, data) {
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
