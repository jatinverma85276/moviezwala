const express = require("express");
const addController = require("../controllers/addController");

const router = express.Router();

router.route("/add/:movieName").get(addController.addMovie);
router.route("/:id").get(addController.getDetail);
router.route("/").get(addController.allmovie);

module.exports = router;
