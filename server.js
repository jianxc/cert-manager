// Dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('./lib/session/session'),
    routes = require('./routes/v1/routes'),
    send = require('./lib/response/sender'),
    errors = require('./lib/response/errors'),
    config = require('./config');

// Initialize app
var app = express();

// Use application/x-www-form-urlencoded body parsing middleware
app.use(bodyParser.urlencoded({extended: false}));

// Use JSON body parsing middleware
app.use(bodyParser.json());

// Use session middleware
app.use(session);

// v1 Index GET Route
app.get('/v1/', routes.get.index);

// v1 Login POST Route
app.post('/v1/auth/login', routes.post.login);
// v1 Logout POST Route
app.post('/v1/auth/logout', routes.post.logout);

// v1 PKI PUT Route
app.put('/v1/pki/:slug', routes.put.pki);
// v1 PKI DELETE Route
app.delete('/v1/pki/:slug', routes.delete.pki);

// Use not found handling middleware
app.use(function(req, res, next) {
  // Send a response with a not_found error
  send(res, null, [errors.not_found]);
});

// Use error handling middleware
app.use(function(err, req, res, next) {
  // Log the error to console
  console.error(err);
  // Send a response with internal_server_error
  send(res, null, [errors.internal_server_error]);
});

// Listen on specified port and assign it to server
var server = app.listen(config.web.port, function() {
  // Log port
  console.log('Web server listening on port', config.web.port);
  // Perform datastore checks
  require('./lib/datastore/datastore').init(function(err) {
    // Determine if an error occurred
    if (err) {
      // Log the failed initialization
      console.error('Failed to initialize the datastore');
      // Log the error
      console.error(err);
    } else {
      // Log the successful initialization
      console.log('Successfully initialized the datastore');
    }
  });
  // Establish a connection with the database
  require('./lib/database/database').init(function(err) {
    // Determine if an error occurred
    if (err) {
      // Log the failed connection
      console.error('Failed to connect to the database at', config.db.path);
      // Log the error
      console.error(err);
      // Close the Express server
      server.close();
    } else {
      // Log the successful connection
      console.log('Successfully connected to the database at', config.db.path);
    }
  });
});
