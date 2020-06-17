const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(
      "mongodb+srv://milan:doom.1996@cluster0-46xli.mongodb.net/playground?retryWrites=true&w=majority"
    )
    .then(() => winston.info("Connected to MongoDB..."));
};
