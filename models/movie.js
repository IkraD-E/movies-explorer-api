const mongoose = require('mongoose');
const validator = require('validator');

const movieShema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    minlength: 3,
  },
  description: {
    type: String,
    minlength: 2,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Введен некорректный URL постера',
    },
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Введен некорректный URL трейлера',
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Введен некорректный URL миниатюры постера',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    unique: true,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
  },
});

module.exports = mongoose.model('movie', movieShema);
