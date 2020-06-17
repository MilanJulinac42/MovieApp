const mongoose = require("mongoose");
const Joi = require("Joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = mongoose.Schema({
  name: { type: String, require: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    unique: true,
    require: true,
    minlength: 5,
    maxlength: 255,
  },
  isAdmin: { type: Boolean },
  password: { type: String, require: true, minlength: 8, maxlength: 1024 },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),
  };
  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
