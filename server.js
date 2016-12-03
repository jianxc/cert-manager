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

// Use not found handling middleware
app.use(function(req, res, next) {
  // Send a response with a not_found error
  send(res, null, [errors.not_found]);
});

// Listen on specified port and export it as server
exports.server = app.listen(config.web.port, function() {
  // Log port
  console.log('Web server listening on port', config.web.port);
  // Establish a connection with the database
  require('./lib/database/database');
});
