const express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/', (req, res) => {
  connection.query("Select * from cut", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/:id", (req, res) => {
  connection.query("Select * from cut where id=?", [req.params.id], (err, rows, fields) => {
    if (err) throw err;
    res.send(rows[0]);
  });
});

router.post("/update/:id", (req, res) => {
  let cutName = req.body.cutName;
  connection.query("Update cut set cutName=? where id=?", [cutName, req.params.id], (err, rows, fields) => {
    if (err) throw err
    res.send({
      msg: 'Cut name updated successfully',
      status: 'OK'
    })
  })
})

router.get("/delete/:id", (req, res) => {
  connection.query("Delete from cut where id=?", [req.params.id], (err, rows, fields) => {
    if (err) throw err
    res.send({
      msg: 'Cut name deleted successfully',
      status: 'OK'
    })
  })
})

router.post("/", (req, res) => {
  let cutName = req.body.cutName;
  connection.query("Insert into `cut` (`cutName`) values (?)", [cutName], (err, rows, fields) => {
    if (err) throw err
    res.send({
      msg: "Cut name sent successfully",
      status: "OK"
    })
  })
})


module.exports = router;