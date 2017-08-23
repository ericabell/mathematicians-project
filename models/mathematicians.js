// models/recipe.js
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const fs = require('fs');

const mathematicianSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    born: Date,
    died: Date,
    nationality: String,
    known_for: [String],
    wikipedia_link: String,
    img: { data: Buffer, contentType: String, url: String }
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
    let cauchy = new Mathematician;
    cauchy.img.data = fs.readFileSync('/Users/eabell/sandbox/tiy/week6/day3/mathematicians-project/public/images/cauchy.jpg');
    cauchy.img.contentType = 'image/jpg';
    cauchy.img.url = '/images/cauchy.jpg'
    cauchy.name = 'Cauchy';
    cauchy.born = new Date('8-21-1789');
    cauchy.died = new Date('5-23-1857');
    cauchy.nationality = 'French';
    cauchy.known_for = ['Cauchy–Schwarz inequality', 'Cauchy momentum equation', 'Cauchy–Euler equation'];
    cauchy.wikipedia_link = 'https://en.wikipedia.org/wiki/Augustin-Louis_Cauchy';

    cauchy.save()
    .then( (docs) => {
        console.log('Created mathematician Cauchy');
        console.log(docs);
    })

    let newton = new Mathematician;
    newton.img.data = fs.readFileSync('/Users/eabell/sandbox/tiy/week6/day3/mathematicians-project/public/images/cauchy.jpg');
    newton.img.contentType = 'image/jpg';
    newton.img.url = '/images/newton.jpg'
    newton.name = 'Newton';
    newton.born = new Date('8-21-1789');
    newton.died = new Date('5-23-1857');
    newton.nationality = 'English';
    newton.known_for = ['Calculus', 'Newtonian mechanics', 'Binomial series'];
    newton.wikipedia_link = 'https://en.wikipedia.org/wiki/Augustin-Louis_Cauchy';

    newton.save()
    .then( (docs) => {
        console.log('Created mathematician Newton');
        console.log(docs);
    })
  })



  .catch( (err) => {
      console.log('Errors: ' + err);
  })


module.exports = Mathematician;
