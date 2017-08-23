const express = require('express');
ObjectId = require('mongodb').ObjectID;
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

router.get('/update/:id', (req, res) => {
  // find the requested mathematician
  Mathematician.find({_id: ObjectId(req.params.id)})
    .then( (docs) => {
      console.log('find a specific mathematician');
      console.log(docs);
      // the dates need to be transformed to "YYYY-MM-DD" so that
      // the value attribute works
      res.render('update', {data: docs, bornDate: docs[0].bornDate, diedDate: docs[0].diedDate});
    })
});

router.post('/', (req, res) => {
  // create a new mathematician
  console.log(req.body);
  Mathematician.create({
    name: req.body.name,
    born: new Date(req.body.born),
    died: new Date(req.body.died),
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

router.post('/:id', (req, res) => {
  // update a mathematician in the db
  console.log(req.body);
  Mathematician
    .where({_id: ObjectId(req.params.id)})
    .update( { name: req.body.name,
               born: new Date(req.body.born),
               died: new Date(req.body.died),
               nationality: req.body.nationality
     })
     .then( (docs) => {
       console.log('Mathematician updated!');
       res.redirect('/');
     })
});

router.get('/delete/:id', (req, res) => {
  // delete a mathematician specified by the id
  Mathematician.deleteOne({_id: ObjectId(req.params.id)})
  .then( (docs) => {
    console.log(`Deleted mathematician ${docs.name}`);
    res.redirect('/');
  })
})

module.exports = router;
