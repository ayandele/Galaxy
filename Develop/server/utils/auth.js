const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express'); // Import AuthenticationError from Apollo Server Express

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
// function for our authenticated middleware
authMiddleware: function (context) {
// Check if the token is in the context
const token = context.req.headers.authorization;

if (!token) {
throw new AuthenticationError('You have no token!');
}

try {
// Verify token and get user data out of it
const { data } = jwt.verify(token, secret, { maxAge: expiration });
context.user = data;
} catch (error) {
console.log('Invalid token');
throw new AuthenticationError('Invalid token');
}
},
signToken: function ({ username, email, _id }) {
const payload = { username, email, _id };

return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
},
};