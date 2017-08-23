// models/recipe.js
const mongoose = require('mongoose');

const mathematicianSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    born: Date,
    died: Date,
    nationality: String,
    known_for: [String],
    photo: Buffer
});

// virtual field for getting age

const Mathematician = mongoose.model('Mathematician', mathematicianSchema);

module.exports = Mathematician;
