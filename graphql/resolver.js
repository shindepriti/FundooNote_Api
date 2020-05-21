/***************************************************************
 * @purpose  : Define Resolver
 * @file     : resolver.js              
 * @overview : Define Resolver map Field In Schema type  
 * @author   : priti shinde
 * @since    : 20/5/2020
***************************************************************/

const message = require('./query').message
const getAllUser = require("./query").getAllUser
const register = require('./mutation/user').register
const login = require("./mutation/user").login

exports.resolvers = {

    Query : {
        message,
        getAllUser

    },
    Mutation : {
        register,
        login        
    }
}