const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('./models'); // Import your Mongoose models

const resolvers = {
  Query: {
    // Resolver for the "me" query to get the currently authenticated user
    me: async (_, __, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('savedBooks');
        return user;
      }
      throw new AuthenticationError('You need to be logged in.');
    },
    // Add other query resolvers here
  },
  Mutation: {
    // Resolver for the "login" mutation
    login: async (_, { email, password }) => {
      // Validate credentials and return an authentication token
      // use authentication logic here??
    },
    // Resolver for the "addUser" mutation
    addUser: async (_, args) => {
      // Create a new user and return an authentication token
      //use your user registration logic here??
    },
    // Resolver for the "saveBook" mutation
    saveBook: async (_, { bookData }, context) => {
      // Ensure the user is authenticated
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedBooks: bookData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in.');
    },
    // Resolver for the "removeBook" mutation
    removeBook: async (_, { bookId }, context) => {
      // Ensure the user is authenticated
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in.');
    },
    // Add other mutation resolvers here
  },
};

module.exports = resolvers;
