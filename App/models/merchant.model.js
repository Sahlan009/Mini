const db = require("../config/db");

const create = (params, callback) => {
  const insertQuery = `INSERT INTO merchant (name, phone_number, password, address) VALUES (?, ?, ?, ?);`;
  db.query(insertQuery, params, callback);
};

const update = (params, callback) => {
  const updateQuery = `UPDATE merchant SET name = ?, phone_number = ?, address = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
  db.query(updateQuery, params, callback);
};

const merchantDelete = (params, callback) => {
  const deleteQuery = `DELETE FROM merchant WHERE id = ?;`;
  db.query(deleteQuery, params, callback);
};



module.exports = {
  create,
  update,
  merchantDelete,
};