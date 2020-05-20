/*************************************************************
 * @purpose : Creating Basic Graphql Server
 * @file    : server.js
 * @author  : priti shinde
 * @since   : 19/5/2020
***********************************************************/

const ApolloServer = require("apollo-server")

const app  = new ApolloServer({ typeDefs, resolvers });

app.listen(process.env.PORT,() =>{
  console.log(`Server Listening On Port ${process.env.PORT}`)
})