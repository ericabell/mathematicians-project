const express = require('express');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.jpg')
  }
})

const upload = multer({ storage: storage })

// const upload = multer({ dest: 'uploads/' });

const fs = require('fs');
ObjectId = require('mongodb').ObjectID;
// const data = require('../models/users');
let data = {};
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

let router = express.Router();

let Mathematician = require('../models/mathematicians')

router.get('/', (req, res) => {
  console.log('root hit');
  Mathematician.find()
    .then( (docs) => {
      console.log('find all mathematicians');
      console.log(docs);
      res.render('directory', {data: docs, bornDate: docs[0].bornDate, diedDate: docs[0].diedDate});
    })
});

router.get('/id/:id', (req, res) => {
  Mathematician.find({_id: ObjectId(req.params.id)})
    .then( (docs) => {
      console.log('find one mathematician');
      console.log(docs);
      res.render('directory', {data: docs, bornDate: docs[0].bornDate, diedDate: docs[0].diedDate});
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

router.post('/', upload.single('sampleFile'), (req, res) => {
  if(!req.file) {
    return res.status(400).send('No files were selected');
  }

  console.log(req.file);
  let imageUpload = fs.readFileSync('/Users/eabell/sandbox/tiy/week6/day3/mathematicians-project/uploads/' + req.file.filename );
  // create a new mathematician
  console.log(req.body);
  Mathematician.create({
    name: req.body.name,
    born: new Date(req.body.born),
    died: new Date(req.body.died),
    nationality: req.body.nationality,
    known_for: ['one', 'two', 'three'],
    img: {
      data: imageUpload,
      contentType: 'image/jpeg'
    },
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

router.get('/images/:id', (req, res) => {
  // fetch an image from the db
  Mathematician.find({_id: ObjectId(req.params.id)})
    .then( (docs) => {
      console.log(`Found mathematician in image search`);
      console.log(docs[0]);
      // we want to send the image back to the browser
      let image = new Buffer(docs[0].img.data.buffer);
      let contentType = docs[0].img.contentType;

      res.set('Content-Type', 'image/jpeg');
      res.send(image)
    })
    .catch( (err) => {
      console.log('error in find');
      res.send('error in find: ' + err);
    })
    })


module.exports = router;
