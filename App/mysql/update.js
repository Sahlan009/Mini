const db = require('../config/db')

let updateQuery = `UPDATE product SET name = ? WHERE id = ?`;
let data = [];
db.query(updateQuery, data, function (err, updated) {
  if (err) throw err;
  console.log(updated);
});
