 const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/page');

const schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  
});

schema.pre('save', function(next) {
    const password = bcrypt.hashSync(this.password,10);
    this.password = password;
    next(); 
   });
const usermodel = mongoose.model('users', schema);
module.exports = usermodel;
