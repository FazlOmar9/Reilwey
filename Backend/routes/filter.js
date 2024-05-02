const express = require('express');
const connectDb = require('../connect');

const router = express.Router();

const db = connectDb();

// filter endpoint options src, dest and date for trains
router.get('/:query', (req, res) => {
  let query = req.params.query;
  let sql = `SELECT DISTINCT ${query} FROM trains ORDER BY ${query} ASC`; // Add ORDER BY clause to sort in ascending order
  db.query(sql, (err, result) => {
    if (err) {
      res.status(400).send('Invalid request');
      return;
    }
    let uniqueValues = result.map((item) => item[query]);
    res.status(200).send(uniqueValues);
  });
});

module.exports = router;
