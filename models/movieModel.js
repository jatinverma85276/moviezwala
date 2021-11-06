const mongoose = require("mongoose");
const slugify = require("slugify");

const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    text: true,
  },
  slug: String,
  movieDuration: {
    type: String,
  },
  movieImage: String,
  genre: {
    type: [String],
    required: true,
  },
  releaseDate: {
    type: Date,
  },
  year: Number,
  rating: {
    type: Number,
  },
  metaRating: Number,
  storyline: {
    type: String,
  },
  director: String,
  creator: String,
  actor: String,
  language: String,
  coverImage: [String],
  keywords: [String],
  download: String,
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
movieSchema.pre("save", function (next) {
  this.slug = slugify(this.movieName, { lower: true });
  next();
});

movieSchema.pre(/^find/, function (next) {
  this.find().sort({ _id: -1 });
  next();
});
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
