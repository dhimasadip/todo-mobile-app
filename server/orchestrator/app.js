require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const port = process.env.PORT || 3001

const server = new ApolloServer({ typeDefs, resolvers })

server
  .listen({ port })
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })