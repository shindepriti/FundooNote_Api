import { gql } from "apollo-server"

const typeDefs = gql`

type user {
    firstName : String!
    lastName  : String!
    emailid   : String!
    password  : String!
}

type Query {
    message : String!
};
`
module.exports = { typeDefs }