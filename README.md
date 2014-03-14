WikiScraper.js
========

Get data off Wikipedia.
Fast.

This is both a library, and a small command line utility.

```bash
$wikiscraper --sites '["Helium", "Hydrogen", "Oxygen", "Lithium"]'
```

# Install

```bash
$npm install wikiscraper
```

# About

This tool will get the contents of Wikipedia's infobox (.infobox class),
as a key-value JavaScript object.

It was made out of the neccessity to scrape Chemical element data
for [Mendeleev.io](https://github.com/zpiman/Mendeleev.io)).

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

/* Callback Style */

var elements = [];

wikiscraper.scrape(function(err, element) {
  if (!err) {
    console.log(element);
    elements.push(element);
  }
  else {
    console.error(err);
  }
});

wikiscraper.on("sitesloaded", function() {
  console.dir(elements);
});

/* Event style */

wikiscraper.scrape();

wikiscraper.on("siteloaded", function(site, numberLoaded) {
  console.log("Loaded site", numberLoaded, ":", site);
});

wikiscraper.on("sitesloaded", function(sites) {
  console.dir(sites);
});

wikiscraper.on("err", function(error) {
  console.error("Oh no!", error);
});
```