const express = require("express");
const admin = require("../middleware/admin");
const router = express.Router();
const { Genre, validateGenre } = require("../models/genre");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(404).send("Genre does not exist");
    return;
  }
  res.send(genre);
});

router.post("/", [auth, admin], async (req, res) => {
  const result = validateGenre(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const result = validateGenre(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  if (!genre) {
    res.status(404).send("Genre does not exist");
    return;
  }

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) {
    res.status(404).send("Genre with that id does not exist");
    return;
  }

  res.send(genre);
});

module.exports = router;
