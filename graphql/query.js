/***************************************************************
 * @purpose  : Define Query 
 * @file     : query.js              
 * @overview : Implement Query Type Return Message   
 * @author   : priti shinde
 * @since    : 20/5/2020
***************************************************************/
const userModel = require(".././models/userModel")
exports.message = () =>{
    return "Registration Sucessfull";
}

exports.getAllUser = () =>{
   const user = userModel.find().exec()
        return user
}