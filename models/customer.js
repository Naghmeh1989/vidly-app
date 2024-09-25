const mongoose = require('mongoose');
const Joi = require('joi');
const Customer = mongoose.model('Customer',new mongoose.Schema({
    isGold : {type:'boolean', default:false},
    name : {type:'string', required:true, minlength:1, maxlength:50},
    phone : {type:'string', required:true, minlength:5, maxlength:50}
}));
exports.Customer = Customer;