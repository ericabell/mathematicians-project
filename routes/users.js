const express = require('express');
// const data = require('../models/users');
let data = {};
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

let router = express.Router();

router.get('/', (req, res) => {
  res.render('directory');
});

module.exports = router;
