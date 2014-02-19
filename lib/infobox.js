module.exports = function($) {
console.log("Generic module loaded.");
var site = {};
  
site.infobox = {};
site.infobox.fields = {};
site.infobox.summary = $(".infobox .summary").text();
var infoboxFields = $(".infobox tr");
// Go through all rows.
infoboxFields.each(function(i, field) {
  var title = $(this)
  .children("th")
  .text();
  
  /**
  * Big TODO: make content extraction more intelligent -
  * a tags and so as arrays (optional), and find a better
  * way to remove references.
  */
  
  var content = $(this)
  .children("td")
  .text()
  .replace(/\[(\d+)\]/, "");

  // Only push to array if both title and content are set - excludes images, etc.
  if (title && content) {
    site.infobox.fields[title] = content;
  }
});
  
return site;
  
}