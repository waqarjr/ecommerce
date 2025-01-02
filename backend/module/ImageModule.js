const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/page');

const schema =  mongoose.Schema({
    image:String,
    person_id:String
});

const ImageModule = mongoose.model('images',schema);

module.exports = ImageModule;
