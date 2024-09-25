Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals =  require('./routes/rentals');
const Joi = require('joi');
mongoose.connect('mongodb://localhost/vidly-app')
.then(()=> console.log('Connected to MongoDB'))
.catch(err=> console.error('Could not connect to MongoDB...'));
app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use ('/api/movies', movies);
app.use('/api/rentals',rentals);
const PORT = process.env.PORT || 3000;
app.listen(3000, ()=>console.log(`listening to PORT ${PORT}`));









































