var request = require("request"),
    cheerio = require("cheerio"),
    
    infobox = require("./lib/infobox"),
    geography = require("./lib/geography");

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
        if ($(".infobox").hasClass("geography")) {
          site = geography($);
        }
        else if ($(".infobox")) {
          site = infobox($); 
        }
        cb(undefined, site);
      }
    });
  });
}

module.exports = WikiScraper;

