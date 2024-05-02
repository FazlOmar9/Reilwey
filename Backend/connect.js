const mysql = require('mysql');

function connectDb() {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'railway_dbms',
  });

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('MySQL connected...');
  });

  return db;
}

module.exports = connectDb;