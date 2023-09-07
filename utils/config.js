require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
  DATABASE_URL,
  PORT,
} = process.env;

const DEV_SECRET = 'SUPERSECRETKEY';
const DEV_DATABASE_URL = 'mongodb://localhost:27017/mydatabase';
const DEV_PORT = 3001;

const DB_URL = NODE_ENV === 'production' && DATABASE_URL ? DATABASE_URL : DEV_DATABASE_URL;

const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : DEV_PORT;

const SECRET_STRING = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : DEV_SECRET;

module.exports = {
  DB_URL,
  SERVER_PORT,
  SECRET_STRING,
};
