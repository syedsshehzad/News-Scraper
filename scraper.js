// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.


var scraper = function(cheerio, request) {
  return new Promise((resolve, reject) => {
    // Make a request call to grab the HTML body from the site of your choice
    request("https://www.apple.com/itunes/charts/songs/", function(error, response, html) {

      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(html);

      // An empty array to save the data that we'll scrape
      var results = [];

      // Select each element in the HTML body from which you want information.
      // NOTE: Cheerio selectors function similarly to jQuery's selectors,
      // but be sure to visit the package's npm page to see how it works
      $(".section-content li").each(function(i, element) {

        var link = $(element).find("h3").children().attr("href");
        var title = $(element).find("h3").text();
        var source = $(element).find("img").attr("src");

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
          id: i,
          title: title,
          link: link,
          image: "https://www.apple.com" + source
        });
      });

      // Log the results once you've looped through each of the elements found with cheerio
      resolve(results);
    });
  });
}

module.exports = scraper;