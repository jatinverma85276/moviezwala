const express = require("express");
const addRouter = require("./routes/addRoutes");
const viewRouter = require("./routes/viewRoutes");
const compression = require("compression");
const path = require("path");

const app = express();

// 1) MIDDLEWARE

app.use(express.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(compression());
app.use((req, res, next) => {
  console.log("Hi from middleware");
  next();
});

// 3) ROUTES
app.use("/", viewRouter);
app.use("/api/v1/movie", addRouter);

module.exports = app;
