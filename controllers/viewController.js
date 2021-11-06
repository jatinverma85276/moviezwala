const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const Movie = require("./../models/movieModel");

exports.getOverview = async (req, res) => {
  const movies = await Movie.find();
  res.status(200).render("main", {
    title: "All movie",
    movies,
  });
};

exports.getpage = async (req, res) => {
  var perPage = 20;
  var page = req.params.page || 1;
  // 1) Get movie data from Collection
  const movies = await Movie.find()
    .skip(perPage * page - perPage)
    .limit(perPage);

  // 2) Render that template using tour data from 1)
  res.status(200).render("main", {
    title: "All movie",
    movies,
  });
};

exports.getMovie = async (req, res) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const movie_detail = await Movie.findOne({ slug: req.params.slug });
  // console.log(movie_detail);
  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render("review", {
    title: `Movie`,
    movie_detail,
  });
};

exports.search = async (req, res) => {
  const { search } = req.query;
  // console.log(search);
  const searchMovie = await Movie.find({
    keywords: search.toLowerCase(),
  }).exec();
  // console.log(searchMovie);
  res.status(200).render("search", {
    searchMovie,
  });
};

exports.genreMovie = async (req, res) => {
  // console.log(req.params.genre);

  const genreMovie = await Movie.find({
    genre: req.params.genre,
  });
  res.status(200).render("genre", {
    genreMovie,
  });
};

exports.yearMovie = async (req, res) => {
  // console.log(req.params.year);
  const yearMovie = await Movie.find({
    year: req.params.year,
  });
  res.status(200).render("year", {
    yearMovie,
  });
};

exports.tvShow = async (req, res) => {
  res.status(200).render("sorry");
};

exports.webSeries = async (req, res) => {
  res.status(200).render("sorry");
};
