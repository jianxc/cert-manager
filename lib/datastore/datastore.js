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

// Initialize PKI Function
exports.initializePKI = function(data, callback) {
  // Path
  var path = config.cert.data + data.slug;

  // Attempt to create the PKI directory in the database and set promise
  var promise = Directory.create(data);

  // Attempt to initialize the PKI directory
  promise.then(function(directory) {
    // Determine if PKI directory exists
    if (fs.existsSync(path)) {
      // Return and call the callback
      return(callback(new Error('exists')));
    }

    // Create the PKI directory
    fs.mkdirSync(path);

    // Return and call the callback
    return(callback());
  }).catch(function(err) {
    // Determine if the error's code is 11000
    if (err.code == 11000) {
      // Return and call the callback
      return(callback(new Error('exists')));
    } else {
      // Return and call the callback
      return(callback(err));
    }
  });
}

// Delete PKI Function
exports.deletePKI = function(data, callback) {
  // Path
  var path = config.cert.data + data.slug;

  // Attempt to remove the PKI directory from the database and set promise
  var promise = Directory.remove(data);

  // Attempt to delete the PKI directory
  promise.then(function() {
    // Determine if PKI directory does not exist
    if (!fs.existsSync(path)) {
      // Return and call the callback
      return(callback(new Error('!exists')));
    }

    // Remove the PKI directory
    fs.rmdirSync(path);

    // Return and call the callback
    return(callback());
  }).catch(function(err) {
    // Call the callback
    return(callback(err));
  });
}
