const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const Movie = require("./../models/movieModel");

exports.getOverview = async (req, res) => {
  // 1) Get movie data from Collection
  const movies = await Movie.find();

  // 2) Render that template using tour data from 1)
  res.status(200).render("main", {
    title: "All movie",
    movies,
  });
};

exports.getMovie = async (req, res) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const movie_detail = await Movie.findOne({ slug: req.params.slug });
  console.log(movie_detail);
  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render("review", {
    title: `Movie`,
    movie_detail,
  });
};

exports.search = async (req, res) => {
  const { search } = req.query;
  console.log(search);
  const searchMovie = await Movie.find({
    keywords: search.toLowerCase(),
  }).exec();
  console.log(searchMovie);
  res.status(200).render("search", {
    searchMovie,
  });
};
