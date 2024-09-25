const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const{Customer}= require('../models/customer');
const{Movie}= require('../models/movie');
const{Rental}= require('../models/rental');
const Fawn = require('fawn');
Fawn.init(mongoose);
router.get('/',async(req,res)=>{
    const rental = await Rental.find().sort('-dateOut');
    res.send(rental);
});
router.post('/',async(req,res)=>{
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send('Invalid rental');
        return;
    };
    const customer = await Customer.findById(req.body.customerId);
    if(!customer){
        res.status(400).send('Invalid customer');
        return;
    };
    const movie = await Movie.findById(req.body.movieId);
    if(!movie){
        res.status(400).send('Invalid movie');
        return;
    };
    if(movie.numberInStock === 0){
        res.status(400).send('Movie is not in stock');
        return;
    };
    let rental = new Rental({
        customer:{
            _id :customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        }
    });
    try{
    new Fawn.Task()
    .save('rentals',rental)
    .update('movies',{ _id: movie._id},{
        $inc:{numberInStock:-1}
    })
    .run();
    res.send(rental);
     }
     catch(ex){
        res.status(500).send('something faild!');
     }
});
module.exports = router;