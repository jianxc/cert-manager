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

  // Attempt to create/update the PKI directory in the database and set promise
  var promise = Directory.update({slug: data.slug}, data, {upsert: true});

  // Attempt to create/update the PKI directory
  promise.then(function(directory) {
    // Determine if PKI directory does not exist
    if (!fs.existsSync(path)) {
      // Create the PKI directory
      fs.mkdirSync(path);
    }

    // Return and call the callback
    return(callback());
  }).catch(function(err) {
    // Return and call the callback
    return(callback(err));
  });
}

// Delete PKI Function
exports.deletePKI = function(data, callback) {
  // Path
  var path = config.cert.data + data.slug;

  // Attempt to delete the PKI directory from the database and set promise
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
