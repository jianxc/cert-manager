// Dependencies
var mongoose = require('mongoose'),
    config = require('../../config');

// Connect to the database
mongoose.connect(config.db.path, config.db.options);

// Set conn to the database connection
var conn = mongoose.connection;

// Listen for connection errors
conn.on('error', function(err) {
  // Log the failed connection
  console.error('Failed to connect to the database at', config.db.path);
  // Log the error to console
  console.error(err);
});

// Listen for successful connection
conn.on('open', function() {
  // Log the successful connection
  console.log('Successfully connected to the database at', config.db.path);
});
