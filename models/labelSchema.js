/***************************************************************
 * @purpose  : Define Schema
 * @file     : labelModel.js              
 * @overview : Define Schema For Label
 * @author   : priti shinde
 * @since    :26/5/2020
***************************************************************/


const mongoose = require('mongoose')
const labelSchema = new mongoose.Schema({
    labelName:{
        type : String
    },
    userId:[{ type: Schema.Types.ObjectId, ref: 'user' }]
         
},{
        timestamps:true

});

module.exports = mongoose.model('label',labelSchema)