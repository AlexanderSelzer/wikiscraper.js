module.exports = function($) {
var site = {};
  
site.infobox = {};
site.infobox.fields = {};
site.infobox.name = $(".infobox .country-name").text();
var mergedTopRows = $("table.infobox tr.mergedtoprow");
// Go through all rows.
mergedTopRows.each(function(i, field) {
  var title = $(this)
  .text()
  .replace(/\n/g, " ")
  .trim();
  
  var content = [];
  var mergedrows = $(this).nextUntil(".mergedtoprow");
  mergedrows.each(function(i, field) {
    content.push(
      $(this)
      .text()
      .replace(/\n/g, "")
    );
    /*
    console.log(content[i].charCodeAt(1));
    */
  });
  // Only push to array if both title and content are set - excludes images, etc.
  if (title && content) {
    site.infobox.fields[title] = content;
  }
});
  
return site;
  
}