const { gql } = require('apollo-server-express');
const userTypeDefs = require('./userTypeDefs'); // Import your user typeDefs
const bookTypeDefs = require('./bookTypeDefs'); // Import your book typeDefs

const typeDefs = gql`
  # Your top-level type definitions here
  type Query {
    # Define your queries here
  }

  type Mutation {
    # Define your mutations here
  }
  
  # Include types from imported typeDefs
  ${userTypeDefs}
  ${bookTypeDefs}
`;

const userResolvers = require('./userResolvers'); // Import your user resolvers
const bookResolvers = require('./bookResolvers'); // Import your book resolvers

const resolvers = {
  // Your top-level resolvers here
  Query: {
    // Define your query resolvers here
  },
  Mutation: {
    // Define your mutation resolvers here
  },
  
  // Include resolvers from imported resolvers
  ...userResolvers,
  ...bookResolvers,
};

module.exports = { typeDefs, resolvers };
