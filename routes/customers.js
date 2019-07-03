const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = new mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 12
    },
    isGold: {
      type: Boolean,
      required: true
    },
    phone: {
      type: Number,
      required: true
    }
  })
);

router.get("/", async (req, res) => {
  const customer = await Customer.find();
  if (!customer) {
    return res.status(404).send("Customers are not founded");
  }

  res.send(customer);
});

router.post("/", async (req, res) => {
  //   customerValidate(req.body);
  let customer = await new Customer({
    name: req.body.name,
    isGold: false,
    phone: req.body.phone
  });

  await customer.save();

  res.send(customer);
});

router.put("/:id", async (req, res) => {
  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone
    },
    { new: true }
  );

  await customer.save();
  res.send(customer);
});

// function customerValidate(customer) {
//   const schema = {
//     name: Joi.string()
//       .min(3)
//       .required()
//   };
//   const result = Joi.validate(customer, schema);
//   if (result.error) {
//     return res.status(400).send("There is an error");
//   }
// }
module.exports = router;
