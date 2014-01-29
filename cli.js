var WikiScraper = require("./index.js"),
    argv        = require("optimist").argv,
    colors      = require("colors"),
    fs          = require("fs");

if (argv.s || argv.sites) {
  var sites = JSON.parse(argv.s || argv.sites);

  var wikiscraper = new WikiScraper(sites);

  if (argv.lang)
    wikiscraper.setLanguage(argv.lang);

  wikiscraper.scrape(function(err, results) {
    if (err) {
      console.error(err);
    }
    else {
      console.log(JSON.stringify(results, null, 2));
    }
  });
}
else {
  fs.createReadStream("help.txt")
  .pipe(process.stdout);
}
