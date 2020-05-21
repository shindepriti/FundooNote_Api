/***************************************************************
 * @purpose  : Define Schema Definition Language
 * @file     : schema.js              
 * @overview : Define Query Type And Mutation Type And Input Type
 * @author   : priti shinde
 * @since    : 20/5/2020
***************************************************************/

const { gql } = require("apollo-server")

const typeDefs = gql`

type User {
    firstName : String!
    lastName  : String!
    emailId   : String!
    password  : String!
}

type Auth  {
    message : String!
    success : Boolean! 
    token : String!
    user : User 
}

type Query {
    message : String!
    getAllUser : [User]
}

type Mutation {
    register(firstName:String!,lastName:String!,emailId:String!,password:String!):Auth
    login(emailId:String!,password:String!):Auth
    
}
`
module.exports = { typeDefs }