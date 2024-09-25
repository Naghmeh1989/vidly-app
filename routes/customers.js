const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const router = express.Router();
const {Customer} = require('../models/customer');
router.get('/',async(req,res)=>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
});
router.get('/:id',async(req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer){
        res.status(400).send('Customer was not found!');
        return;
    };
    res.send(customer);
});
router.post('/',async(req,res)=>{
    const schema = Joi.object({
        name : Joi.string().required(),
        phone : Joi.string().required(),
        isGold : Joi.boolean
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send('Is not accepted!');
        return;
    };
    const customer = new Customer({name : req.body.name , phone: req.body.phone , isGold: req.body.isGold});
    await customer.save();
    res.send(customer);
});
router.put('/:id',async(req,res)=>{
    const customer = await Customer.findByIdAndUpdate(req.params.id,{name:req.body.name , phone : req.body.phone},{new : true});
    if(!customer){
        res.status(400).send('Customer was not found!');
        return;
    };
    const schema = Joi.object({
        name : Joi.string().required(),
        phone : Joi.string().required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send('Is not accepted!');
        return;
    };

    res.send(customer);
});
router.delete('/:id',async(req,res)=>{
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if(!customer){
        res.status(400).send('Customer was not found!');
        return;
    }
    res.send(customer);
});
module.exports = router;
