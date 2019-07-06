const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models/users");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  res.json(token);
});

function validate(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  const result = Joi.validate(user, schema);
  return result;
}

module.exports = router;
