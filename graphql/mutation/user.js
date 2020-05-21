/***************************************************************
 * @purpose  : Implement resolver For user 
 * @file     : user.js              
 * @overview : Define User Using positional Argument  
 * @author   : priti shinde
 * @since    : 20/5/2020
***************************************************************/
const userModel = require('../../models/userModel')
const jsonToken = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const sendMail = require("../../service/sendMail")

hash =(password)=>{
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password,salt)
    return hashPassword
}

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
                password : hash(args.password)
                
            })
            console.log(newUser)
            var userSave = await newUser.save()
                if(userSave){
                    return {
                        message : 'Registartion Successfull',
                        success : true,
                        user : newUser 
                    }
                }   
                else{
                    return{
                    message : ' Registration Unsuccessfull',
                    success : false
                    }
                }
            
}

exports.login =  async(parent,args) => {

    let user = await userModel.findOne({emailId : args.emailId})
    let token = jsonToken.sign({emailId:args.emailId},"secretkey" ,{expiresIn :"1hr"})
    console.log(user)    
    if(user.length>0){
        return{
            message : 'login Successfull',
            success : true,
            token   : token
        }
    }   
    else{
         return {
            message : 'Inavlid User, Please Register First To Login',
            success : false  
        }
    }
           
}

