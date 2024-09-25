const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const movieSchema = new mongoose.Schema({
    title:{
        type: 'string',
        required: true ,
        trim: true ,
        minlength: 5 ,
        maxlength: 255
    },
    genre:{
        type : genreSchema,
        required: true
    },
    numberInStock:{
        type : Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});
const Movie = mongoose.model('Movie',movieSchema);
exports.Movie = Movie;