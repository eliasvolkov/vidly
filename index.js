const express = require("express");
const app = express();
const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require("./routes/customers");
const users = require("./routes/users");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("connected"))
  .catch(err => err);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", home);
app.use("/api/genres/", genres);
app.use("/api/customers/", customers);
app.use("/api/users/", users);

const port = process.env.PORT || 3000;
app.listen(port);
