const mongoose = require("mongoose");

const menuItem = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
  },
  age: {
    type: Number,
  },

  work: {
    type: String,
    enum: ["Owner", "Chef", "Manager"], // Values in the enum should be strings
    required: true,
  },

  mobile: {
    type: Number,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  address: {
    type: String,
  },

  salary: {
    type: Number,
  },

});

const Menu = mongoose.model('Menu', menuItem); 
module.exports = Menu;
