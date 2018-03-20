var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var SongSchema = new Schema({
  id: {
  	type: Number,
  	required: false
  },
  // `title` is required and of type String
  // We don't want duplicate songs in database
  title: {
    type: String,
    required: true,
    unique: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  // `image` is not required and of type String
  image: {
  	type: String,
  	required: false
  },
  // `comment` is an object that stores a Comment id
  // The ref property links the ObjectId to the Comment model
  // This allows us to populate the Song with an associated Comment
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

// This creates our model from the above schema, using mongoose's model method
var Song = mongoose.model("Song", SongSchema);

// Export the Song model
module.exports = Song;
