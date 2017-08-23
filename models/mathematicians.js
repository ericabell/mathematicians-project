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

// virtual field for born and died in format for value

mathematicianSchema.virtual('bornDate')
  .get( function() {
    return formatDate(this.born);
  })

mathematicianSchema.virtual('diedDate')
  .get( function() {
    return formatDate(this.died);
  })
  
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}



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
      born: new Date('8-21-1789'),
      died: new Date('5-23-1857'),
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
      born: new Date('12-25-1642'),
      died: new Date('3-20-1727'),
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
