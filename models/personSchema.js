const mongoose = require("mongoose");
const bcrypt = require ('bcrypt');

const personSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
  },
  age: {
    type: Number,
  },

  work: {
    type: String,
    enum: ["Owner", "Chef", "Manager"], 
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
  username: {
    required: true,
    type: String
},
password: {
    required: true,
    type: String
},

  address: {
    type: String,
  },

  salary: {
    type: Number,
  },

});
personSchema.pre('save', async function (next){
  const person = this;
  //hash the password only if it has been modified
  if(!person.isModified('password')) return next();
  try{
    //hash password generator
 const salt = await bcrypt.genSalt(10);
 //hash password
 const hashedPassword = await bcrypt.hash(person.password, salt);
 //override the plain password with the hashed one
 person.password=hashedPassword;
 next();
  }
  catch(err){
    return next(err);

  }

});

personSchema.methods.comparePassword = async function(candidatePassword){
  try{
    const isMatch= await bcrypt.compare(candidatePassword, this.password)
//use bcrypt to compare the password with the hashed password
return isMatch;
  }
  catch(err){
  throw err;
  }
}



const Person = mongoose.model('Person', personSchema); 
module.exports = Person;
