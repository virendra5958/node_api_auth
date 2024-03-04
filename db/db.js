const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/hotels';

mongoose.connect(mongoUrl, {}).then(() => {
  console.log('Mongo Connected');
}).catch(err => {
  console.error('Connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongo Disconnected');
});

