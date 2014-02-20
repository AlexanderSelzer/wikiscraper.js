var EventEmitter = require("events").EventEmitter,
    util = require("util"),
    request = require("request"),
    cheerio = require("cheerio"),
    
    infobox = require("./lib/infobox"),
    geography = require("./lib/geography");

function WikiScraper(sites) {
  EventEmitter.call(this);
  this.selectSites(sites);
  this.language = "en";
};

util.inherits(WikiScraper, EventEmitter);

WikiScraper.prototype.selectSites = function(sites) {
  this.sites = sites
};

WikiScraper.prototype.setLanguage = function(lang) {
  this.language = lang;
};

WikiScraper.prototype.scrape = function(cb) {
  var lang = this.language;
  var self = this;
  var sitesLength = this.sites.length;
  var sitesCrawled = 0;
  this.scrapedSites = [];
  this.sites.forEach(function(site) {
    var wikipediaSite = "http://" + lang + ".wikipedia.org/wiki/" + site;
    request(wikipediaSite, function(err, res, body) {
      if (err) {
        self.emit("err", err);
        if (cb) cb(err, undefined);
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
        self.scrapedSites.push(site);
        self.emit("siteloaded", site, sitesCrawled);
        if (cb) cb(undefined, site);
      }
    
    // Non-threaded FTW!
    sitesCrawled++;
    if (sitesCrawled === sitesLength) {
      self.emit("sitesloaded", self.scrapedSites); 
    }
    });
  });
};

module.exports = WikiScraper;

