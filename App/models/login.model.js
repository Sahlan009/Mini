const db = require("../config/db");

const sign = (params, callback) => {
  const selectQuery = `SELECT id, name, phone_number, address FROM merchant WHERE phone_number = ? AND password = ?;`;
  db.query(selectQuery, params, callback);
};


module.exports = {
  sign,
};