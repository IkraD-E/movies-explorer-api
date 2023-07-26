const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const routerUsers = require('./users');
const routerMovies = require('./movies');
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
      name: Joi.string().min(2).max(30),
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

router.use('/users', routerUsers);

router.use('/movies', routerMovies);

module.exports = router;
