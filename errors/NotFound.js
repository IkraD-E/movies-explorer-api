const { NOT_FOUND_STATUS } = require('../const/const');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_STATUS;
  }
}

module.exports = NotFound;
