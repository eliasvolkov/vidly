const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genres");

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
  if (validate(req.body)) return res.status(400).send("THERE IS ERROR");

  let genre = new Genre({
    name: req.body.name
  });

  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  validate(req.body);

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
  validate(req.body);
  let genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send("Resourse is not founded");
  }
  await genre.delete();

  res.send(genre);
});

module.exports = router;
