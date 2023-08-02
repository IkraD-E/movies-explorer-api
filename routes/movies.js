const routesMovies = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { imagePattern, httpPattern } = require('../const/patterns');

const {
  createMovie,
  getUsersMovies,
  deleteMovie,
} = require('../controllers/movies');

routesMovies.get(
  '/',
  celebrate({
    body: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  getUsersMovies,
);

routesMovies.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(imagePattern),
    trailerLink: Joi.string().required().pattern(httpPattern),
    thumbnail: Joi.string().required().pattern(imagePattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

routesMovies.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = routesMovies;
