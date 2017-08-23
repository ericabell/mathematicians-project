// models/recipe.js
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const mathematicianSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    born: Date,
    died: Date,
    nationality: String,
    known_for: [String],
    wikipedia_link: String,
    photo: Buffer
});

// virtual field for getting age

const Mathematician = mongoose.model('Mathematician', mathematicianSchema);

// drop all mathematicians and create a new one
Mathematician.deleteMany({})
  .then( (docs) => {
    console.log('Deleted all mathematicians');
    console.log(docs.result);
    return(docs);
  })
  .then( () => {
    console.log('let us create some mathematicians');
    Mathematician.create({
      name: 'Cauchy',
      born: Date(),
      died: Date(),
      nationality: 'French',
      known_for: ['one', 'two', 'three'],
      wikipedia_link: 'https://en.wikipedia.org/wiki/Augustin-Louis_Cauchy'
    })
    .then( (docs) => {
        console.log('Created mathematician Cauchy');
        console.log(docs);
    })
    Mathematician.create({
      name: 'Newton',
      born: Date(),
      died: Date(),
      nationality: 'English',
      known_for: ['one', 'two', 'three'],
      wikipedia_link: 'https://en.wikipedia.org/wiki/Augustin-Louis_Cauchy'
    })
    .then( (docs) => {
        console.log('Created mathematician Newton');
        console.log(docs);
    })
  })

  .catch( (err) => {
      console.log('Errors: ' + err);
  })


module.exports = Mathematician;
