module.exports = function($) {
console.log("Geography module loaded");
var site = {};
  
site.infobox = {};
site.infobox.fields = {};
site.infobox.name = $(".infobox .country-name").text();
var mergedTopRows = $("table.infobox tr.mergedtoprow");
// Go through all rows.
mergedTopRows.each(function(i, field) {
  var title = $(this).text();
  var content = " ";
  // Only push to array if both title and content are set - excludes images, etc.
  if (title && content) {
    site.infobox.fields[title] = content;
  }
});
  
return site;
  
}