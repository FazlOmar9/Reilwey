const express = require('express');
const router = express.Router();
const connectDb = require('../connect');

const db = connectDb();

// add ticket endpoint
router.post('/', (req, res) => {
  const { train_id, user_id, tier } = req.body;
  console.log(req.body);
  let sql = `INSERT INTO tickets (train_id, user_id, tier) VALUES ('${train_id}', '${user_id}', '${tier}')`;
  db.query(sql, (err, _) => {
    if (err) {
      console.log(err);
      res.status(400).send('Invalid request');
      return;
    }
    // decrement availability of the train
    sql = `UPDATE trains SET availability=availability-1 WHERE id='${train_id}'`;
    db.query(sql, (err, _) => {
      if (err) {
        console.log(err);
        res.status(400).send('Invalid request');
        return;
      }
    });
    res.status(200).send('Ticket booked successfully');
  });
});

// delete ticket by id endpoint
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let sql = `DELETE FROM tickets WHERE id='${id}'`;
  db.query(sql, (err, _) => {
    if (err) {
      res.status(400).send('Invalid request');
      return;
    }
    // increment availability of the train
    sql = `UPDATE trains SET availability=availability+1 WHERE id=(SELECT train_id FROM tickets WHERE id='${id}')`;
    db.query(sql, (err, _) => {
      if (err) {
        res.status(400).send('Invalid request');
        return;
      }
    });
    res.status(200).send('Ticket deleted successfully');
  });
});

// get ticket by id endpoint
router.get('/:id', (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM tickets WHERE id='${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(400).send('Invalid request');
      return;
    }
    res.status(200).send(result);
  });
});

module.exports = router;