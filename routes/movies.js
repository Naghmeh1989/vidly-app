const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');
const {genreSchema} = require('./genres');
const {Genre} = require('../models/genre'); 
const {Movie} = require('../models/movie'); 
router.get('/',async(req,res)=>{
    const movies = await Movie.find().sort('title');
    res.send(movies);
});
router.get('/:id',async(req,res)=>{
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        res.status(400).send('Invalid Id!');
        return;
    };
    res.send(movie);
});
router.post('/',async(req,res)=>{
    const schema = Joi.object({
        title:Joi.string().min(5).max(50).required(),
        genreId:Joi.objectId().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send('Invalid movie');
        return;
    };
    const genre = await Genre.findById(req.body.genreId);
    if(!genre){
        res.status(400).send('Invalid genre');
        return;
    };

    const movie = new Movie({
        title: req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
});
router.put('/:id',async(req,res)=>{
    const movie = await Movie.findByIdAndUpdate(req.body.id);
    if(!movie){
        res.status(400).send('Invalid Id!');
        return;
    };
    const schema = Joi.object({
        title:Joi.string().min(5).max(50).required(),
        genreId:Joi.string().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send('Invalid movie');
        return;
    };
    res.send(movie);
});
router.delete('/:id',async(req,res)=>{
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie){
        res.status(400).send('Invalid Id!');
        return;
    };
    res.send(movie);
});


module.exports = router;