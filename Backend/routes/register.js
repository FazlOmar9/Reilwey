const express = require('express');
const router = express.Router();
const connectDb = require('../connect');

const db = connectDb();

// register endpoint
router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    res.status(400).send('Bad request');
    return;
  }
  
  let sql = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(400).send('Invalid request');
      return;
    }
    const userId = result.insertId;
    res.status(200).send({id: userId});
  });
});

module.exports = router;