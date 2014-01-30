var r = require("rethinkdb"),
    WikiScraper = require("./index.js"),
    fs = require("fs");

r.connect({
  host: "localhost",
  db: "wikipedia"
}, function(err, conn) {
  fs.readFile("elements.json", function(err, data) {
    // Does not like single brackets (??!).
    var wikiscraper = new WikiScraper(JSON.parse(data.toString()));

    wikiscraper.scrape(function(err, site) {
      if (err) throw err;
      console.log("Writing site", site.title, "to DB.");
      r.table("sites").insert(site).run(conn, function(err) {
        if (err) throw err;
      });
    });
  });
});
