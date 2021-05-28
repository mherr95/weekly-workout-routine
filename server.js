const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req,res) => {
    res.send('Welcom to the Homepage!');
});

app.get('/user/', (req,res) => {
    res.render('index.ejs');
});



app.listen(PORT, function() {
    console.log('Connected to Server');
});