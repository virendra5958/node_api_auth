const express = require('express');
const db = require('./db/db');
const router = require('./routes/data')
const menu = require('./routes/menuData')
const bodyParser = require('body-parser');
const dotenv = require ('dotenv');
const passport = require('passport');
const localPassport = require('passport-local');
dotenv.config();
const port = process.env.PORT || 5000;
const app= express()

app.use(bodyParser.json());




//  how to use middleware signup
const logRouter =(req, res, next) =>{
  console.log(`${new Date().toLocaleString()}Request Made to : ${req.originalUrl}`);
  next();// move on to the next
};
app.use(logRouter)
app.get('/', function (req, res) {
  res.send('welcome to our Root')
});





app.use('/person',router );
app.use('/menu',menu );



app.listen(5000, () => {
  console.log(`Server running on port ${port}`);
});