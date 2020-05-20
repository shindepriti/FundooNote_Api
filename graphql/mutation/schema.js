const { gql } = require("apollo-server")

const typeDefs = gql`

type User {
    firstName : String!
    lastName  : String!
    emailId   : String!
    password  : String!
}

type Query {
    message : String!
}

`
module.exports = { typeDefs }