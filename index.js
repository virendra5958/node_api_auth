const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./auth');
const router = require('./routes/data');
const menu = require('./routes/menuData');
const db = require('./db/db')
// require('dotenv').config();
// const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

// Middleware for logging requests
const logRouter = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
  next();
};

app.use(passport.initialize());
const localAuthentical=passport.authenticate('local', { session: false })
 app.use(logRouter);
app.get('/',localAuthentical,function(req, res)  {
  res.send('Welcome to our Root');
});

// Routes
app.use('/person',localAuthentical, router);
app.use('/menu',localAuthentical, menu);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(5000, console.log('server started'))
