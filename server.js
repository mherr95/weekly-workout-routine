const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//App config
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;

//Connect to Mongo
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'weeklyRoutine'

//Middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());

//External Middleware
mongoose.connect(MONGODB_URI , {useNewUrlParser: true});
db.once('open', () => {
    console.log('connected to mongo');
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

app.get('/', (req,res) => {
    res.redirect('/day');
})

//Controllers
const daysController = require('./Controllers/dayOfWeek.js');
app.use(daysController);



app.listen(PORT, function() {
    console.log('Connected to Server');
});