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
const secretkey = process.env.SECRETKEY
hash =(password)=>{
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password,salt)
    return hashPassword
}

exports.register = async (parent,args)=>{
    
    let emailValid = /^([a-zA-Z]{3,}([._+-]?[a-zA-Z0-9])*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}[.]?[a-zA-Z]*)$/;
        if (args.firstName < 3){
            throw new Error("First Atleast Contain 3 character")
        }
        if(!emailValid.test(args.emailId)){
            throw new Error("Email Not Valid");
        }
        if(args.password.length < 8){
            throw new Error("Password must  Contain 8 Character")
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
    let emailValid = /^([a-zA-Z]{3,}([._+-]?[a-zA-Z0-9])*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}[.]?[a-zA-Z]*)$/;
        
        if(!emailValid.test(args.emailId)){
            throw new Error("Email Not Valid");
        }

        let user = await userModel.findOne({emailId : args.emailId})
        let token = jsonToken.sign({emailId:args.emailId},secretkey ,{expiresIn :"1hr"})
        console.log(user)
        let newPassword = bcrypt.compare(args.password,user.password)   
        if(user==undefined){
            return{
                message : 'Inavlid User, Please Register First To Login',
                success : false
            }
        }   
        else{
            return {
                message : 'login Successfull',
                success : true,
                token   : token
            }
        }           
}

exports.forgotPassword = (parent,args,context)=>{
    let user = userModel.findOne({emailId:args.emailId})
    let token = jsonToken.sign({emailId:args.emailId},secretkey ,{expiresIn :"1hr"})
    const url = `http://localhost:3000/graphql?token=${token}`;
    sendMail.sendEmail(url)
    if(user==undefined){
        return{
            message:" Invalid User,Please Register First",
            success:false
            
        }
    }else{
        return{
            message:"Token Generated Sucessfully",
            success:true,
           
        }
    }
}

exports.resetPassword = (parent,args,context)=>{
    
    console.log(context.authorization);
    const token = context.authorization ; 
    if (token) {
        let authUser ;
        try{
            authUser = jsonToken.verify(token, secretkey)
        }catch(err){
            throw new Error("Invalid authentication token.")
        }
        console.log(authUser.emailId)
        let user = userModel.findOne({emailId:authUser.emailId})
        if(!user){
            throw new Error("Passord reset link is invalid or Expire")
        }
    }else{
        throw new Error("Invalid user request ")
    }

    if(args.password < 8){
        throw new Error("Password should contain minimum 8 Character")
    }
        let newPassword = bcrypt.hashSync(args.password,10)
        let updatePassword = userModel.updateOne({id:args._id},{password:newPassword})
            if(updatePassword){
                return {
                    message : "Password Reset Sucessfully",
                    success : true
                }
            }else{
                return {
                    message:"Error in Reset password",
                    success:false
                }
            }

}


