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
   const users = userModel.find().exec()
        return users
}

exports.getUserById =(root,args)=>{
    const user = userModel.findById(args.id).exec()
    return user
}