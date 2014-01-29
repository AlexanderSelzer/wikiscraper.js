var request = require("request");

function WikiScraper(sites) {
  this.selectSites(sites);
}

WikiScraper.prototype.selectSites = function(sites) {
  this.sites = sites
}

WikiScraper.prototype.scrape = function(cb) {
  var scrapedSites = {};
  this.sites.forEach(function(site) {
    console.log(site);
  });
}

module.exports = WikiScraper;
