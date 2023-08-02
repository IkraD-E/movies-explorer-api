const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const NotFound = require('./errors/NotFound');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./const/limiter');
const routes = require('./routes');

// Working port & Database URL

const { SERVER_PORT, DB_URL } = require('./utils/config');

const app = express();

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`Успешно подключен к серверу: ${DB_URL}`);
  })
  .catch(() => {
    console.log(`Провалено подключение к серверу: ${DB_URL}`);
  });

app.use(cors);

app.use(cookieParser());

app.use(helmet());

app.use(express.json());

app.use(requestLogger);

app.use(limiter);

// Server Crash test

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use(routes);

app.use((req, res, next) => {
  next(new NotFound('Страница не найдена. Где вы взяли на неё ссылку?'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`Слушаем порт: ${SERVER_PORT}`);
});
