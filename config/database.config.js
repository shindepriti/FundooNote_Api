/***************************************************************
 * @purpose  : Define Mongodb Connection
 * @file     : database.config.js              
 * @overview : Define Mongoose To Connect With Mongodb Databse  
 * @author   : priti shinde
 * @since    : 19/5/2020
***************************************************************/

require('dotenv').config();
const mongoose = require("mongoose")

module.exports = mongoConnection=()=> {
  
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DB_URL,{
       useNewUrlParser:true 
    }).then(() => {
        console.log("Sucessfully connect to database")
    }).catch(err => {
        console.log("Could Not Connect To Database",err)
        process.exit();
    })  
}
