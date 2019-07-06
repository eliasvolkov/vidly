const config = require("config");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require("./routes/customers");
const users = require("./routes/users");
const auth = require("./routes/auth");
const mongoose = require("mongoose");

if (!config.get("jwtPrivateKey")) {
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("connected"))
  .catch(err => err);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/", home);
app.use("/api/genres/", genres);
app.use("/api/customers/", customers);
app.use("/api/users/", users);
app.use("/api/auth/", auth);

const port = process.env.PORT || 3000;
app.listen(port);
