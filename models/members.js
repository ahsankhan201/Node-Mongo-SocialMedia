const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
var bcrypt = require("bcryptjs");
const {  correctPassword } = require("../utils/methods/methods");


var userSchema = new Schema({
    email: String,
    password: String,
    role: String,
    update_at:{ type: Date},
    created_at: { type: Date, default: Date.now }
});

//encrypt password
userSchema.methods.generateHash = function (password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        return callback(err, hash);
      });
    });
  };

  //compare password
  userSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      return done(null, isMatch);
    });
  };

userSchema.methods.correctPassword = correctPassword;


module.exports = mongoose.model('member', userSchema,'member');
