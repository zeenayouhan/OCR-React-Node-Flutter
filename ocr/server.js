const express = require('express');
const multer = require('multer');
const app = express();
const fs = require('fs');
var Tesseract = require('tesseract.js');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var config = require('./config');
var userRoute = require('./route/user.route');
 
// connect to mongoDB 
mongoose.connect(config.dbUrl);
mongoose.connection.on('connected', () => {
    console.log('connected to mongo database');
});

mongoose.connection.on('error', err => {
    console.log('Error at mongoDB: ' + err);
});
app.use(bodyParser.json());
app.use('/users', userRoute);


//middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const PORT = process.env.PORT | 8000;

var Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + '/images');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

var upload = multer({
  storage: Storage
}).single('image');
//route
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  console.log(req.file);
  upload(req, res, err => {
    if (err) {
      console.log(err);
      return res.send('Something went wrong');
    }

    var image = fs.readFileSync(
      __dirname + '/images/' + req.file.originalname,
      {
        encoding: null
      }
    );
    Tesseract.recognize(image)
      .progress(function (p) {
        console.log('progress', p);
      })
      .then(function(result) {
       res.json(result.text);
        
      });
  });
});

app.get('/showdata', (req, res) => {});
var server = http.createServer(app);
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
