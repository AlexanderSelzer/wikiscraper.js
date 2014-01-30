var request = require("request"),
    cheerio = require("cheerio");

function WikiScraper(sites) {
  this.selectSites(sites);
  this.language = "en";
}

WikiScraper.prototype.selectSites = function(sites) {
  this.sites = sites
}

WikiScraper.prototype.setLanguage = function(lang) {
  this.language = lang;
}

WikiScraper.prototype.scrape = function(cb) {
  var lang = this.language;
  var scrapedSites = {};
  this.sites.forEach(function(site) {
    var wikipediaSite = "http://" + lang + ".wikipedia.org/wiki/" + site;
    request(wikipediaSite, function(err, res, body) {
      if (err) {
        cb(err, undefined);
      }
      else {
        var site = {};
        var $ = cheerio.load(body);
        site["title"] = $("title").html();
        if ($(".infobox")) {
          site.infobox = {};
          site.infobox.fields = {};
          site.infobox.caption = $(".infobox caption.summary").html();
          var infoboxFields = $("table.infobox tr");
          // Go through all rows.
          infoboxFields.each(function(i, field) {
            var title = $(this).children("th").text();
            var content = $(this).children("td").text();

            // Only push to array if both title and content are set - excludes images, etc.
            if (title && content) {
              site.infobox.fields[title] = content;
            }
          });
        }
        cb(undefined, site);
      }
    });
  });
}

module.exports = WikiScraper;

