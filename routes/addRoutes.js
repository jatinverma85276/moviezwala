const addController = require("../controllers/addController");
const express = require("express");
// const mongoose = require("mongoose");
const router = express.Router();

// if (!mongoose.Types.ObjectId.isValid(id)) return false;

router.route("/").get(addController.allmovie);
router.route("/add/:movieName").get(addController.addMovie);
router.route("/:id").get(addController.getDetail);
router.route("/genre/:genre").get(addController.genreMovie);
router.route("/year/:year").get(addController.yearMovie);

module.exports = router;
