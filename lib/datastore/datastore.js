// Dependencies
var fs = require('fs'),
    Directory = require('../database/schemas/directory'),
    config = require('../../config');

// Init Function
exports.init = function(callback) {
  // Determine if data directory does not exist
  if (!fs.existsSync(config.cert.data)) {
    // Create the directory
    fs.mkdirSync(config.cert.data);
  }

  // Call the callback
  return(callback());
}

// Create PKI Function
exports.createPKI = require('./directory/create');

// Delete PKI Function
exports.deletePKI = require('./directory/delete');
