// Dependencies
var fs = require('fs'),
    Directory = require('../database/schemas/directory'),
    config = require('../../config');

// Init Function
exports.init = function(callback) {
  // Determine if data directory does not exit
  if (!fs.existsSync(config.cert.data)) {
    // Create the directory
    fs.mkdirSync(config.cert.data);
  }

  // Call the callback
  return(callback());
}

// Initialize PKI Function
exports.initializePKI = function(data, callback) {
  // Path
  var path = config.cert.data + data.slug;

  // Attempt to initailize PKI directory
  Directory.create(data, function(err, directory) {
    // Determine if an error occurred
    if (err && err.code == 11000) {
      // Return and call the callback
      return(callback(new Error('exists')));
    } else if (err) {
      // Return and call the callback
      return(callback(err));
    }

    // Determine if PKI directory exists
    if (fs.existsSync(path)) {
      // Return and call the callback
      return(callback(new Error('exists')));
    }

    // Create the PKI directory
    fs.mkdirSync(path);

    // Return and call the callback
    return(callback());
  });
}

// Delete PKI Function
exports.deletePKI = function(data, callback) {
  // Path
  var path = config.cert.data + data.slug;

  // Attempt to remove PKI directory
  Directory.remove(data, function(err) {
    // Determine if an error occurred and call the callback
    if (err) return(callback(err));

    // Determine if PKI directory does not exist
    if (!fs.existsSync(path)) {
      // Return and call the callback
      return(callback(new Error('!exists')));
    }

    // Remove the PKI directory
    fs.rmdirSync(path);

    // Return and call the callback
    return(callback());
  });
}
