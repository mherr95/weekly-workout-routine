const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//App config
const app = express();
const PORT = 3000;

//Middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//External Middleware
mongoose.connect('mongodb://localhost:27017/weeklyRoutine', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

const daysController = require('./Controllers/dayOfWeek.js');
app.use(daysController);

app.listen(PORT, function() {
    console.log('Connected to Server');
});