const routesUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUserData,
  getUserMe,
  logout,
} = require('../controllers/users');

routesUsers.get('/', getUsers);

routesUsers.get('/me', getUserMe);

routesUsers.delete(
  '/me',
  logout,
);

routesUsers.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  getUserById,
);

routesUsers.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }).unknown(true),
  }),
  updateUserData,
);

module.exports = routesUsers;
