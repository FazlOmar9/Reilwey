const express = require('express');
const router = express.Router();
const connectDb = require('../connect');

const db = connectDb();

const stringify = (obj) => JSON.stringify(obj);

// add train endpoint
router.post('/', (req, res) => {
  const { source, destination, day, arr_time, dep_time, availability } = req.body;
  let sql = `INSERT INTO trains (source, destination, day, arrival_time, departure_time, availability) VALUES ('${source}', '${destination}', '${day}', '${arr_time}', '${dep_time}', '${availability}')`;
  db.query(sql, (err, _) => {
    if (err) {
      res.status(400).send('Invalid request');
      return;
    }
    res.status(200).send('Train added successfully');
  });
});

// get all trains endpoint
router.get('/', (req, res) => {
  let sql = 'SELECT * FROM trains';
  console.log(req.query);
  if (req.query.source && req.query.destination) {
    sql = `SELECT * FROM trains WHERE source='${req.query.source}' AND destination='${req.query.destination}'`;
    if (req.query.day) {
      sql = `SELECT * FROM trains WHERE source='${req.query.source}' AND destination='${req.query.destination}' AND date='${stringify(req.query.day)}'`;
    }
  }
  else if (req.query.source) {
    sql = `SELECT * FROM trains WHERE source='${req.query.source}'`;
    if (req.query.date) {
      sql = `SELECT * FROM trains WHERE source='${req.query.source}' AND date='${stringify(req.query.day)}'`;
    }
  }
  else if (req.query.destination) {
    sql = `SELECT * FROM trains WHERE destination='${req.query.destination}'`;
    if (req.query.date) {
      sql = `SELECT * FROM trains WHERE destination='${req.query.destination}' AND date='${stringify(req.query.day)}'`;
    }
  }
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send('Invalid request');
      return;
    }
    res.status(200).send(result);
  });
});

// get train by id endpoint
router.get('/:id', (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM trains WHERE id='${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(400).send('Invalid request');
      return;
    }
    res.status(200).send(result);
  });
});

// delete train by id endpoint and remove all tickets associated with the train
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let sql = `DELETE FROM trains WHERE id='${id}'`;
  db.query(sql, (err, _) => {
    if (err) {
      res.status(400).send('Invalid request');
      return;
    }
    sql = `DELETE FROM tickets WHERE train_id='${id}'`;
    db.query(sql, (err, _) => {
      if (err) {
        res.status(400).send('Invalid request');
        return;
      }
      res.status(200).send('Train deleted successfully');
    });
  });
});

module.exports = router;