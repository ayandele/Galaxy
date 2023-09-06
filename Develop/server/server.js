const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express'); // Import Apollo Server
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./graphql'); // Import your GraphQL schema and resolvers


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create an instance of Apollo Server
const server = new ApolloServer({
typeDefs,
resolvers,
  context: ({ req }) => {
    // Implement authentication logic here 
    // access req.headers.authorization to get the token and perform user authentication.
    return {
      // Add your context data here
    };
  },
});

// Apply Apollo Server as middleware to Express
server.applyMiddleware({ app });


//app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => 
    console.log(`🌍 Now listening on localhost:${PORT}`));
});
