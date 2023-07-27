const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const routesUsers = require('./users');
const routesMovies = require('./movies');
const auth = require('../middlewares/auth');

const {
  createUser,
  login,
} = require('../controllers/users');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

router.use(auth);

router.use('/users', routesUsers);

router.use('/movies', routesMovies);

module.exports = router;
