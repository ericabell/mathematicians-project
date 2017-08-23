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

router.get('/create', (req, res) => {
  res.render('create');
})

router.post('/', (req, res) => {
  // create a new mathematician
  console.log(req.body);
  Mathematician.create({
    name: req.body.name,
    born: req.body.born,
    died: req.body.died,
    nationality: req.body.nationality,
    known_for: ['one', 'two', 'three'],
    wikipedia_link: 'https://en.wikipedia.org/wiki/Augustin-Louis_Cauchy'
  })
  .then( (docs) => {
      console.log(`Created mathematician ${docs.name}`);
      console.log(docs);
      res.redirect('/');
  })

});

module.exports = router;
