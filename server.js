/* Sources
Related back to previous lecture notes mostly.
Got help from Professors as well as TA's
*/




const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

require('dotenv').config();

//App config
const app = express();
const PORT = process.env.PORT || 3000;

//Connect to Mongo
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'weeklyRoutine'

console.log(MONGODB_URI);

//Middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());

//External Middleware
mongoose.connect(MONGODB_URI , {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});


app.get('/', (req,res) => {
    res.redirect('/day');
})

//Controllers
const daysController = require('./Controllers/dayOfWeek.js');
app.use(daysController);


app.listen(PORT, function() {
    console.log('Connected to Server');
});