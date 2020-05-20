const { gql } = require("apollo-server")

const typeDefs = gql`

type User {
    firstName : String!
    lastName  : String!
    emailId   : String!
    password  : String!
}
type Auth {
    message : String!
    success : Boolean! 
}

type Query {
    message : String!
}

type Mutation {
    register(firstName:String!,lastName:String!,emailId:String!,password:String!):Auth
}
`
module.exports = { typeDefs }