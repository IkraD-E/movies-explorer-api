const { MISSED_DATA_STATUS } = require('../const/const');

class MissiedData extends Error {
  constructor(message) {
    super(message);
    this.statusCode = MISSED_DATA_STATUS;
  }
}

module.exports = MissiedData;
