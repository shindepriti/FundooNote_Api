/******************************************************************
 * @purpose : Creating Basic Graphql Server And Mongodb Connection
 * @file    : server.js
 * @author  : priti shinde
 * @since   : 19/5/2020
*****************************************************************/
require('dotenv').config();
const {ApolloServer} = require("apollo-server")
const dbConfig = require('./config/database.config') (mongoConnection)

const {typeDefs} = require("./graphql/schema")
const resolvers = require("./graphql/resolver").resolvers;
const app  = new ApolloServer({ typeDefs, resolvers });


app.listen(process.env.PORT,() =>{
  console.log(`Server Listening On Port ${process.env.PORT}`)
})