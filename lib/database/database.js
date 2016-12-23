// Dependencies
var mongoose = require('mongoose'),
    config = require('../../config');

// Init Function
exports.init = function(callback) {
  // Set promise provider
  mongoose.Promise = require('bluebird');

  // Connect to the database
  mongoose.connect(config.db.path, config.db.options);

  // Set conn to the database connection
  var conn = mongoose.connection;

  // Listen for connection errors
  conn.on('error', function(err) {
    return(callback(err));
  });

  // Listen for successful connection
  conn.on('open', function() {
    // Call the callback
    return(callback());
  });
}
