const mongoose = require("mongoose");
const Joi = require("Joi");

const customerSchema = mongoose.Schema({
  isGold: { type: Boolean, require: true, default: false },
  name: { type: String, require: true, min: 5, max: 50 },
  phone: { type: String, require: true, min: 5, max: 50 },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = {
    isGold: Joi.boolean().required(),
    name: Joi.string().required().min(5).max(50),
    phone: Joi.string().required().min(5).max(50),
  };
  return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
