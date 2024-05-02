const mysql = require('mysql');
const connectDb = require('./connect');

const setupDb = () => {
  const db = connectDb();

  // Create table users
  let sql =
    'CREATE TABLE IF NOT EXISTS users(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, (err, _) => {
    if (err) throw err;
    console.log('Users table created...');
  });

  // Create table tickets
  sql =
    'CREATE TABLE IF NOT EXISTS tickets(id int AUTO_INCREMENT, user_id int, train_id int, tier ENUM("2A", "3A", "SL"), PRIMARY KEY(id))';
  db.query(sql, (err, _) => {
    if (err) throw err;
    console.log('Tickets table created...');
  });

  // Create table trains
  sql =
    'CREATE TABLE IF NOT EXISTS trains(id int AUTO_INCREMENT, source VARCHAR(255), destination VARCHAR(255), day VARCHAR(255), arrival_time TIME, departure_time TIME, availability int, PRIMARY KEY(id))';
  db.query(sql, (err, _) => {
    if (err) throw err;
    console.log('Trains table created...');
  });

  db.end();
};

module.exports = setupDb;
