// Required Packages
const express = require('express');
const router = express.Router();

//Import Model from items.js
const Day = require('../models/day.js')


////////////////////////////////////////////
/////       ROUTES
////////////////////////////////////////////

//New Route
router.get('/new', (req,res) => {
    res.render('new.ejs');
});


//Create Route
router.post('/', (req,res) => {
    Day.create(req.body, (error, createdDays) => {
        if(error){
            res.send(error);
        }else {
            console.log(createdDays);
            res.redirect('/');
        };
    });
});


//Index Route
router.get('/', (req,res) => {
    Day.find({}, (error, allDays) => {
        if(error){
            res.send(error);
        }else{
            res.render('index.ejs', {
                days: allDays
            });
        };
    });
});


//Edit Route
router.get('/:id/edit', (req,res) => {
   Day.findById(req.params.id, (error, daysEdit) => {
       if(error){
           res.send(error)
       }else{
           res.render('edit.ejs', {
               days: daysEdit,
               index: req.params.id
           });
       };
   });
});


//Show Route
router.get('/:id', (req,res) => {
    Day.findById(req.params.id, (error, foundDays) => {
        if(error){
            res.send(error);
        }else{
            res.render('show.ejs',{
                days: foundDays,
                index: req.params.id
            });
        };
    });
});


//Delete Route
router.delete('/:id', (req,res) => {
    console.log(req.params.id);
    Day.findByIdAndRemove(req.params.id, (error, dayDelete) => {
        if(error){
            res.send(error);
        }else{
            console.log(dayDelete);
            res.redirect('/')
        };
    });
});


//Update Route
router.put('/:id', (req,res) => {
    Day.findByIdAndUpdate(req.params.id, req.body, (error, day) => {
        if(error){
            res.send(error);
        }else{
            res.redirect('/');
        };
    });
});


module.exports = router;