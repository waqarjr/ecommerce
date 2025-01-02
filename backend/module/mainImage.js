const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/page");

const schema = mongoose.Schema({
    title:String,
    price:Number,
    image:String,
})

const schema1 = mongoose.Schema({

})
const mainImage = mongoose.model("multiples",schema);

module.exports = mainImage;
