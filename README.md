# Song-Scraper
(13)

## Deployed on Heroku at
https://agile-ocean-86659.herokuapp.com

## How it works
First, the user clicks on the hyperlink above.

It opens the website's home page in the browser.

When the home page is requested, the web server runs the **scraper.js** function.

The scraper uses "Cheerio" to GET the HTML of the iTunes top 100 songs chart.

It requests the HTML of this webpage: https://www.apple.com/itunes/charts/songs/.

It scrapes the HTML to obtain information about each of the 100 songs.

It scrapes each song's title, preview link, and image URL.
```
results = [
{id: 1, title: "Say Something", link: "https://apple.com/---", image: "https://apple.com/---.jpg"},
{id: 2, title: "Perfect", link: "https://apple.com/---", image: "https://apple.com/---.jpg"},
{id: 3, title: "New Rules", link: "https://apple.com/---", image: "https://apple.com/---.jpg"},
...
{id: 100, title: "Attention", link: "https://apple.com/---", source: "https://apple.com/---.jpg"}
]
```
After the scraper returns the results array, the results are temporarily saved to the variable `cache`.

`var cache = results`

Then it sends the results array to the **index** handlebars file.

The handlebars renders a page which has 100 divs, where each div has a button for saving the song.

Each button is rendered with the id attribute which is the id from results array.

When a user clicks save button, it sends AJAX "POST" request with information of the id of the button.

Then the server finds the corresponding song: `var song = cache[songId]` .

The song is saved when the server creates a song entry in MongoDB.

If successfully saved, responds with title of song.

When the user requests the page with all saved songs: https://agile-ocean-86659.herokuapp.com/saved.

The server queries database to find all songs, which returns results like:
```
results = [
{_id: "5ab5df", id: 2, title: "Perfect", link: "https://apple.com/---", image: "https://apple.com/---.jpg"},
{_id: "14b2b3", id: 3, title: "New Rules", link: "https://apple.com/---", image: "https://apple.com/---.jpg"}
]
```
Then it sends the results array to the **selection** handlebars file.

It renders a page where each div has a button for removing the song.

Each button is rendered with the id attribute which equals the `_id` from results array.

When a user clicks delete button, it sends AJAX "POST" request with information of the id of the button.

* Duplicate song entries cannot be saved. "Title" must be unique.
* It's important to know that `id` and `_id` are different.
* The `id` only matches the scraped data in the home page.
* The `_id` only matches the saved data in the saved page.
* Comments can be added or deleted only in the "saved" page.
* Each div in the "saved" page is populated with comments.