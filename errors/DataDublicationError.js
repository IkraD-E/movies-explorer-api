const { DUPLICATE_STATUS } = require('../const/const');

class DataDublicationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DUPLICATE_STATUS;
  }
}

module.exports = DataDublicationError;
