const express = require('express');
// const data = require('../models/users');
let data = {};
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

let router = express.Router();

let Mathematician = require('../models/mathematicians')

router.get('/', (req, res) => {
  Mathematician.find()
    .then( (docs) => {
      console.log('find all mathematicians');
      console.log(docs);
      res.render('directory', {data: docs});
    })
});

router.post('/', (req, res) => {

});

module.exports = router;
