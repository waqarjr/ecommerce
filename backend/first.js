const express =  require('express');
const app = express();
const cors = require("cors");

app.use(cors()); 


var cookieParser = require('cookie-parser')
app.use(cookieParser())

// const route = require('./routes/route');

const routes =  require("./routes/multiple");
app.set('view engine', 'ejs');

// app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// app.use(function(req,res,next){
//     res.redirect('/signin')
//     next();
// })
 

app.use('/',routes);

app.listen(4000);