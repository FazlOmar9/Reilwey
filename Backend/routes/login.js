const express = require('express');
const router = express.Router();
const connectDb = require('../connect');

const db = connectDb();

// login endpoint
router.post('/', (req, res) => {
  const { email, password } = req.body;
  let sql = `SELECT id FROM users WHERE email='${email}' AND password='${password}'`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(400).send('Invalid request');
      return;
    }
    if (result.length === 0) {
      res.status(400).send('Invalid credentials');
      return;
    }
    res.status(200).send({ id: result[0].id });
  });
});

module.exports = router;
