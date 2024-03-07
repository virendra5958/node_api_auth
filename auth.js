const Person = require('./models/personSchema');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');


passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      // console.log('Received credentials:', username, password);
      const user = await Person.findOne({ username });
      if (!user)
        return done(null, false, { message: 'Incorrect username.' });
  
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
  
      // Passwords match, return the user object
      return done(null, user);
    } catch (err) {
      // Handle errors appropriately
      return done(err);
    }
  }));
  module.exports = passport;