var express = require("express");

var app = express();
var port = process.env.PORT || 3000;

var exphbs = require("express-handlebars");

var cheerio = require("cheerio");
var request = require("request");
var scraper = require("./scraper.js");

var mongoose = require("mongoose");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/week18Populater";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});
var db = require("./models");

var bodyParser = require("body-parser");
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static('public'));


var cache;

/********************************************************************
LOAD HOME PAGE - SCRAPED RESULTS
********************************************************************/
app.get("/", function(req, res) {
  // The web scraper will intake arguments cheerio and request
  scraper(cheerio, request).then(results => {
    // Cache the results
    cache = results;
    // Send the results array to the index handlebars file
    res.render("index", {results});
  });
});

/********************************************************************
SAVE A SONG FROM HOME PAGE
********************************************************************/
app.post("/save", function(req, res) {
  var songId = req.body.songId;
  var song = cache[songId];
  console.log(song);

  db.Song.create(song)
    .then(function(dbSong) {
      // View the added result in the console
      console.log(dbSong);
      res.json(dbSong.title + " has been saved!");
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      return res.json(err);
    });
});

/********************************************************************
LOAD ALL SAVED SONGS
********************************************************************/
app.get("/saved", function(req, res) {
  db.Song.find({})
    .populate("comments")
    .then(function(results) {
      console.log(results);
      res.render("selection", {results});
    })
    .catch(function(err) {
      return res.json(err);
    });
});

/********************************************************************
REMOVE SONG FROM SAVED PAGE
********************************************************************/
app.post("/remove", function(req, res) {
  var songId = req.body.songId;

  db.Song.remove({_id: songId})
    .then(function(result) {
      // View the removed result in the console
      console.log(result);
      res.json(result.n + " song has been deleted!");
    })
    .catch(function(err) {
      return res.json(err);
    });
});

/********************************************************************
LOAD ONE SAVED SONG
********************************************************************/
app.get("/saved/:id", function(req, res) {
  db.Song.find({_id: req.params.id})
    .populate("comments")
    .then(function(results) {
      res.render("selection", {results});
      console.log(results);
    })
    .catch(function(err) {
      return res.json(err);
    });
});

/********************************************************************
POST A COMMENT
********************************************************************/
app.post("/comment/:_id", function(req, res) {
  db.Comment.create({
    title: req.body.commentTitle,
    body: req.body.commentBody
  })
    .then(function(newComment) {
      db.Song.update({_id: req.params._id}, {$push: {comments: newComment._id}}, function(error, edited) {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(edited);
          //res.json(newComment);
        }
      });
    })
    .catch(function(err) {
        return res.json(err);
    });
});

/********************************************************************
DELETE A COMMENT
********************************************************************/
app.post("/x/:_id", function(req, res) {
  db.Comment.remove({_id: req.params._id})
    .then(function(result) {
      console.log(result);
      res.json(result);
    })
    .catch(function(err) {
      return res.json(err);
    });
});

// Start the server
app.listen(port, function() {
  console.log("App running on port " + port + "!");
});
