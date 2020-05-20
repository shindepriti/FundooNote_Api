/***************************************************************
 * @purpose  : Implement resolver For user 
 * @file     : user.js              
 * @overview : Define User Using positional Argument  
 * @author   : priti shinde
 * @since    : 20/5/2020
***************************************************************/
const userModel = require('../../models/userModel')
const jsonToken = require("jsonwebtoken")

exports.register = async (parent,args)=>{
    
    let emailValid = /^([a-zA-Z]{3,}([._+-]?[a-zA-Z0-9])*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}[.]?[a-zA-Z]*)$/;
        
        if(!emailValid.test(args.emailId)){
            throw new Error("Email Not Valid");
        }
        if(args.password.length < 8){
            throw new Error("Password Contain 8 Character")
        }
        let user = await userModel.find({
        emailId :args.emailId
        })
            if(user.length > 0){
                throw new Error ('Email Already Exist')
            }
            var newUser = new userModel ({
                firstName : args.firstName,
                lastName : args.lastName,
                emailId : args.emailId,
                password : args.password
            })
            var userSave = await newUser.save()
                if(userSave){
                    return {
                        message : 'Registartion Successfull',
                        success : true
                        
                    }
                }   
                else{
                    return{
                    message : ' Registration Unsuccessfull',
                    success : false
                    }
                }
            
}

exports.login =  (parent,args) => {

    if(args.password.length < 8){
        throw new Error("Password Contain 8 Character")
    }
    let user = userModel.findOne({emailId : args.emailId})
    let token = jsonToken.sign({password:args.password},"secretkey" ,{expiresIn :"1hr"})
        if(user){
            return {
                message : 'login Successfull',
                success : true,
                token   : token
            }
        }   
        else{
            return{
            message : 'Inavlid User, Please Register First To Login',
            success : false
            }
        }
           
}
