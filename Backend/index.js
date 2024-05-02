const express = require('express');
const mysql = require('mysql');
const setupDb = require('./db_setup');
const cors = require('cors');
const morgan = require('morgan');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Check if database exists and create if not
let databaseName = 'railway_dbms';
db.query(
  `CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`,
  (err, _) => {
    if (err) throw err;
    console.log('Database checked / created...');
  }
);

// Now we can switch to our database
db.changeUser({ database: databaseName }, function (err) {
  if (err) {
    console.log('error in changing database', err);
    return;
  }
});

const login = require('./routes/login');
const register = require('./routes/register');
const trains = require('./routes/train');
const tickets = require('./routes/ticket');
const filters = require('./routes/filter');

setupDb();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/login', login);
app.use('/register', register);
app.use('/trains', trains);
app.use('/tickets', tickets);
app.use('/filters', filters);

// Listen on a port
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
