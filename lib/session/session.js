// Dependencies
var session = require('express-session'),
    config = require('../../config'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session);

// Export the session configuration
module.exports = session({
  name: config.session.name,
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection, ttl: config.session.ttl})
});
