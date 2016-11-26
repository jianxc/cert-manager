// Dependencies
var express = require('express'),
    database = require('./lib/database/database'),
    session = require('./lib/session/session'),
    routes = require('./routes/v1/routes'),
    config = require('./config');

// Initialize app
var app = express();

// Session Middleware
app.use(session);

// v1 Index GET Route
app.get('/v1/', routes.get.index);

// Listen on specified port
app.listen(config.web.port, function() {
  // Log port
  console.log('Web server listening on port', config.web.port);
});
