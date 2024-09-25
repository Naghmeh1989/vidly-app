const mongoose = require('mongoose');
const Joi = require('joi');
const genreSchema = new mongoose.Schema({
    name : {type: 'string',
    required : true ,
    minlength : 5 ,
    maxlength : 50}
});
const Genre = mongoose.model('Genre', genreSchema);
exports.Genre = Genre;
exports.genreSchema = genreSchema;