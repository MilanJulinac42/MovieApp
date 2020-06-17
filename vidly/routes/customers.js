const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { Customer, validateCustomer } = require("../models/customer");

router.get("/", async (req, res) => {
  const result = await Customer.find();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await Customer.findById(req.params.id);
  if (!result) {
    res.status(404).send("Customer with given id does not exist...");
    return;
  }
  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const result = validateCustomer(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
  const result = validateCustomer(req.body);

  if (result.error) {
    res.status(400).res.send(result.error.details[0].message);
    return;
  }
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );
  if (!customer) {
    return res.status(404).send("Customer with gived id does not exist...");
  }
  res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) {
    return res.status(404).send("Customer with gived id does not exist...");
  }
  res.send(customer);
});

module.exports = router;
