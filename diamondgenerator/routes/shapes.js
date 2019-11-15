const express = require('express');
var router = express.Router();
var connection = require('../connection');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images/");
  },
  filename: function (req, file, callback) {
    let extentionarr = file.originalname.split(".");
    let extention = extentionarr[extentionarr.length - 1];
    callback(null, "profile" + "-" + Date.now() + '.' + extention);
  }
});

var upload = multer({
  storage: storage
});

router.post("/upload", upload.single('shapeimg'), (req, res) => {
  const file = req.file;
  console.log(req.file);
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    throw error
  }
  res.json(file)
});

router.get('/', function (req, res, next) {
  connection.query("Select * from shapes", (err, rows, fields) => {
    if (err) throw err
    res.send(rows);
  });
});

router.post('/', (req, res) => {
  let shapeName = req.body.shapeName;
  let filepath = req.body.filepath;
  connection.query("Insert into `shapes` (`shapeName`,`filepath`) values (?,?)", [shapeName, filepath], (err, rows, fields) => {
    if (err) throw err;
    res.send({
      msg: 'Shape data sent successfully',
      status: 'OK'
    })
  });
});

router.get('/:id', (req, res) => {
  connection.query("Select * from shapes Where id=?", [req.params.id], (err, rows, fields) => {
    if (err) {
      res.send({
        Error: err,
        msg: 'No content found',
        success: false
      })
    } else {
      res.send(rows[0]);
    }
  });
});

router.get("/delete/:id", (req, res) => {
  connection.query("Delete from shapes Where id=?", [req.params.id], (err, rows, fields) => {
    if (err) throw err
    res.send({
      msg: 'Shape name deleted successfully',
      status: 'OK'
    });
  });
});

router.post('/update/:id', (req, res) => {
  let shapeName = req.body.shapeName;
  let filepath = req.body.filepath;
  connection.query("Update shapes set shapeName=?,filepath=? where id=?", [shapeName, filepath, req.params.id],
    (err, rows, fields) => {
      if (err) throw err
      res.send({
        msg: 'Shape name updated successfully',
        status: 'OK'
      });
    });
});

module.exports = router;