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
router.post('/day', (req,res) => {
    Day.create(req.body, (error, createdDays) => {
        if(error){
            res.send(error);
        }else {
            console.log(createdDays);
            res.redirect('/day');
        };
    });
});


//Index Route
router.get('/day', (req,res) => {
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
router.get('/day/:id/edit', (req,res) => {
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
router.get('/day/:id', (req,res) => {
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
router.delete('/day/:id', (req,res) => {
    console.log(req.params.id);
    Day.findByIdAndRemove(req.params.id, (error, dayDelete) => {
        if(error){
            res.send(error);
        }else{
            console.log(dayDelete);
            res.redirect('/day')
        };
    });
});


//Update Route
router.put('/day/:id', (req,res) => {
    Day.findByIdAndUpdate(req.params.id, req.body, (error, day) => {
        if(error){
            res.send(error);
        }else{
            res.redirect('/day');
        };
    });
});


module.exports = router;