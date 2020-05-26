/***************************************************************
 * @purpose  : Define Schema
 * @file     : noteModel.js              
 * @overview : Define Schema For Note
 * @author   : priti shinde
 * @since    :26/5/2020
***************************************************************/


const mongoose = require('mongoose')
const noteSchema = new mongoose.Schema({
    title:{
        type : String
    },
    description:{
        type : String
    },
    userId:[{ type: Schema.Types.ObjectId, ref: 'user' }]
         
},{
        timestamps:true

});

module.exports = mongoose.model('note',noteSchema)