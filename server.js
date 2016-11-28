// Dependencies
var express = require('express'),
    database = require('./lib/database/database'),
    bodyParser = require('body-parser'),
    session = require('./lib/session/session'),
    routes = require('./routes/v1/routes'),
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

// v1 Logout POST Route
app.post('/v1/auth/logout', routes.post.logout);

// Listen on specified port
app.listen(config.web.port, function() {
  // Log port
  console.log('Web server listening on port', config.web.port);
});
