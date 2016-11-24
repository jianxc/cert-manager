// Dependencies
var express = require('express'),
    config = require('./config');

// Initialize app
var app = express();

// Listen on specified port
app.listen(config.web.port, function() {
  // Log port
  console.log('Web server listening on port', config.web.port);
});
