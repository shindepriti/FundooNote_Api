/***************************************************************
 * @purpose  : Define Schema
 * @file     : userModel.js              
 * @overview : Define Schema For User Registartion 
 * @author   : priti shinde
 * @since    : 20/5/2020
***************************************************************/

const regex = require("../models/regexValid")
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required:true,
        minlength:3,
    },
    lastName:{
        type : String,
        required:true,
        minlength:1,
    },
    emailId:{
        type : String,
        required:true,
        unique:true,
        index:{
            unique:true
        },
        match:regex.emailRegx()
    },
    password:{type : String,required:true,minlength:8},
},{
        timestamps:true

});

module.exports = mongoose.model('user',userSchema)