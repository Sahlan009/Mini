const mysql = require('mysql');
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '242468',
    database : 'warung',
    port : '3306'
});

module.exports = db