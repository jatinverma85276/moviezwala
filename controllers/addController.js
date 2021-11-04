const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const Movie = require("../models/movieModel");
const fs = require("fs");
const APIFeatures = require("./../utils/apiFeatures");
const request = require("request");

var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};
let i = 1;

exports.addMovie = async (req, res) => {
  const imdb_id = req.params.movieName;

  const imdb_response = await fetch(
    `https://imdb-api.com/en/API/Title/k_qbfco06p/${imdb_id}/Posters`
  );
  const imdb_data = await imdb_response.json();
  const backdrops = imdb_data.posters["backdrops"].slice(0, 4);
  for (const poster of backdrops) {
    console.log(poster["link"]);
    download(
      `${poster["link"]}`,
      `./public/resources/img/moviePoster/${imdb_data["title"] + i}.jpg`,
      function () {
        console.log("done poster");
      }
    );
  }
  const cover_images = [
    `${imdb_data["title"]}1.jpg`,
    `${imdb_data["title"]}2.jpg`,
    `${imdb_data["title"]}3.jpg`,
    `${imdb_data["title"]}4.jpg`,
  ];
  download(
    `${imdb_data["image"]}`,
    `./public/resources/img/movie/${imdb_data["title"]}.jpg`,
    function () {
      console.log("done");
    }
  );
  const movie_Name = `Download ${imdb_data["fullTitle"]} {${imdb_data["languages"]}}`;
  const movieSplitKeyword = imdb_data["title"].toLowerCase().split(" ");
  const movie = await Movie.create({
    movieName: movie_Name,
    title: imdb_data["title"],
    movieDuration: imdb_data["runtimeStr"],
    movieImage: `${imdb_data["title"]}.jpg`,
    genre: imdb_data["genres"],
    releaseDate: imdb_data["releaseDate"],
    rating: imdb_data["imDbRating"],
    metaRating: imdb_data["metacriticRating"],
    storyline: imdb_data["plot"],
    director: imdb_data["directors"],
    actor: imdb_data["stars"],
    language: imdb_data["languages"],
    coverImage: cover_images,
    keywords: [...movieSplitKeyword, imdb_data["title"].toLowerCase()],
  });

  res.status(200).json({
    status: "success",
    data: movie,
  });
};
exports.allmovie = async (req, res, next) => {
  const { page = 1, limit = 12 } = req.query;
  console.log(req.query);
  const movie_details = await Movie.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
  // Tour.findOne({ _id: req.params.id })

  res.status(200).json({
    status: "success",
    results: movie_details.length,
    data: {
      movie_details,
    },
  });
};

exports.getDetail = async (req, res, next) => {
  const movie_details = await Movie.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id })

  res.status(200).json({
    status: "success",
    data: {
      movie_details,
    },
  });
};

exports.search = async (req, res) => {
  const searchMovie = await Movie.find(req.params.searchedMovie);

  res.status(200).json({
    status: "success",
    data: {
      searchMovie,
    },
  });
};
