const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//App config
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'weeklyRoutine'


//Middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//External Middleware
mongoose.connect(MONGODB_URI , {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

app.get('/', (req,res) => {
    res.send('Herkou Works');
});

const daysController = require('./Controllers/dayOfWeek.js');
app.use('/day', daysController);

app.listen(PORT, function() {
    console.log('Connected to Server');
});