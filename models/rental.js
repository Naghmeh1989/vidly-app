const Joi = require('joi');
const mongoose = require('mongoose');
const Rental = mongoose.model('Rental',new mongoose.Schema({
    customer : {
        type: new mongoose.Schema({
            name:{
                type:'string',
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold:{
                type: 'boolean',
                default: false
            },
            phone:{
                type: 'string',
                required: true ,
                minlength: 5,
                maxlength: 50,
            }

        }),
        required: true
    },
    movie :{
        type: new mongoose.Schema({
            title:{
                type: 'string',
                required: true ,
                trim: true,
                minlength: 5,
                maxlength: 255,
            },
            dailyRentalRate:{
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut:{
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned:{
        type: Date
    },
    rentalFee:{
        type: Number,
        min: 0
    }

}));
module.exports.Rental= Rental;