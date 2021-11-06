const viewController = require("./../controllers/viewController");
const express = require("express");
const router = express.Router();

router.get("/", viewController.getOverview);
router.get("/page/:page", viewController.getpage);
router.get("/movie/:slug", viewController.getMovie);
router.get("/search", viewController.search);
router.get("/genre/:genre", viewController.genreMovie);
router.get("/year/:year", viewController.yearMovie);
router.get("/tv-shows", viewController.tvShow);
router.get("/web-series", viewController.webSeries);

module.exports = router;
