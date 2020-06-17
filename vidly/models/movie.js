const mongoose = require("mongoose");
const Joi = require("Joi");

const movieSchema = mongoose.Schema({
  title: { type: String, require: true },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
  },
  numberInStock: { type: Number, require: true },
  dailyRentalRate: { type: Number, default: 0 },
});

const Movie = new mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().required(),
    genre: Joi.objectId().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number(),
  };
  return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;

// .populate('genre', 'name -_id')
