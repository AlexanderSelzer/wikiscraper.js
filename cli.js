var WikiScraper = require("./index.js"),
    argv        = require("optimist").argv,
    colors      = require("colors"),
    fs          = require("fs");

if (argv.s || argv.sites) {
  var sites = JSON.parse(argv.s || argv.sites);

  var wikiscraper = new WikiScraper(sites);

  if (argv.lang)
    wikiscraper.setLanguage(argv.lang);
  
  wikiscraper.scrape();
  
  /*
  wikiscraper.on("siteloaded", function(site, number) {
    console.log("Scraped site", number);
  });
  */
  
  wikiscraper.on("sitesloaded", function(sites) {
    console.log(JSON.stringify(sites, null, 2));
  });
  
  wikiscraper.on("err", function(error) {
    console.log(error);
  });
}
else {
  fs.createReadStream(__dirname + "/help.txt")
  .pipe(process.stdout);
}
