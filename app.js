const express = require('express');
const mustacheExpress = require('mustache-express');
const morgan = require('morgan');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');


mongoose.connect('mongodb://localhost:27017/math');


let users = require('./routes/users.js');
let app = express();


app.use(express.static('public'));
app.use(morgan('tiny'))

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use('/', users);

app.listen(3000, () => {
  console.log('Listening on 3000');
})
