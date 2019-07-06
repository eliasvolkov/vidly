const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { Customer, validate } = require("../models/customers");

router.get("/", async (req, res) => {
  const customer = await Customer.find();
  if (!customer) {
    return res.status(404).send("Customers are not founded");
  }

  res.send(customer);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
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

module.exports = router;
