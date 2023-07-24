require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routerIndex = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const NotFound = require('./errors/NotFound');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Working port

const { PORT = 3000 } = process.env;

// Database URL

const BASE_URL = 'mongodb://127.0.0.1:27017/mestodb';

const app = express();

mongoose
  .connect(BASE_URL)
  .then(() => {
    console.log(`Успешно подключен к серверу: ${BASE_URL}`);
  })
  .catch(() => {
    console.log(`Провалено подключение к серверу: ${BASE_URL}`);
  });

app.use(cors);

app.use(express.json());

app.use(cookieParser());

app.use(requestLogger);

// Server Crash test

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use('/', routerIndex);

app.use((req, res, next) => {
  next(new NotFound('Страница не найдена. Где вы взяли на неё ссылку?'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Слушаем порт: ${PORT}`);
});
