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

function customerValidate(customer) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    phone: Joi.number()
      .min(3)
      .max(12)
      .required()
  };
  const result = Joi.validate(customer, schema);
  return result.error;
}

exports.Customer = Customer;
exports.validate = customerValidate;
