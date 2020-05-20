const userModel = require('../../models/userModel')

exports.register = async (parent,args,Context)=>{
    
    let emailvalid = /^([a-zA-Z]{3,}([._+-]?[a-zA-Z0-9])*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}[.]?[a-zA-Z]*)$/;
        
        if(!emailvalid.test(args.emailId)){
            throw new Error("Email Not Valid");
        }
        if(args.password.length < 8){
            throw new Error("Valid Password")
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
            var userSave = await newUser.save();
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