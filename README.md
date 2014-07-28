WikiScraper.js
========

Get data off Wikipedia.
Fast.

Wikiscraper is both a library, and a command line utility.

```bash
$ wikiscraper Helium Hydrogen Oxygen Lithium
## or
$ echo '["Helium", "Hydrogen", "Oxygen", "Lithium"]' | wikiscraper
```

A JSON array of Wikipedia sites will be returned:

```bash
$ wikiscraper markdown
[
  {
    "infobox": {
      "fields": {
        "Filename extension": ".md, .markdown",
        "Uniform Type Identifier (UTI)": "net.daringfireball.markdown",
        "Developed by": "John Gruber",
        "Initial release": "March 25, 2004; 10 years ago (2004-03-25)",
        "Latest release": "1.0.1  / December 17, 2004; 9 years ago (2004-12-17)",
        "Type of format": "Markup language",
        "Open format?": "yes",
        "Website": "daringfireball.net/projects/markdown/"
      },
      "summary": ""
    },
    "title": "Markdown - Wikipedia, the free encyclopedia",
    "name": "Markdown"
  }
]
```

# Install

```bash
$ npm install -g wikiscraper
```

# About

This tool will get the contents of Wikipedia's infobox (.infobox class),
as a JSON object.

We needed to scrape Wikipedia's data on
chemical elements for [Mendeleev.io](https://github.com/zpiman/Mendeleev.io)),
so this was made.

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
