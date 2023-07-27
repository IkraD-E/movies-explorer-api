const { AUTH_STATUS } = require('../const/const');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTH_STATUS;
  }
}

module.exports = AuthError;
