const express = require('express');
const db = require('./db/db');
const app = express();
const Menu = require('./models/menuItem');
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({
      start: true,
      message: ' working',
    });
  });
  

  app.listen(5001, () => console.log('Server running'));