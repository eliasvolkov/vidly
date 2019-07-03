const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  })
);

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.send("ERROR");
  } else {
    res.send(genre);
  }
});

router.post("/", async (req, res) => {
  genreValidate(req.body);

  let genre = new Genre({
    name: req.body.name
  });

  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  genreValidate(req.body);

  let genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );
  if (!genre) {
    return res.status(404).send("Resourse is not founded");
  }

  genre = await genre.save();

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  genreValidate(req.body);
  let genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send("Resourse is not founded");
  }
  await genre.delete();

  res.send(genre);
});

function genreValidate(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(genre, schema);
  if (result.error) {
    return res.status(400).send("There is an error");
  }
}

module.exports = router;
