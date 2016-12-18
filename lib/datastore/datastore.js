// Dependencies
var fs = require('fs'),
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
exports.initializePKI = function(name, callback) {
  // Path
  var path = config.cert.data + name;

  // Determine if PKI directory exists
  if (fs.existsSync(path)) {
    // Return and call the callback
    return(callback(new Error('exists')));
  }

  // Create the PKI directory
  fs.mkdirSync(path);

  // Return and call the callback
  return(callback());
}

// Delete PKI Function
exports.deletePKI = function(name, callback) {
  // Path
  var path = config.cert.data + name;

  // Determine if PKI directory does not exist
  if (!fs.existsSync(path)) {
    // Return and call the callback
    return(callback(new Error('!exists')));
  }

  // Remove the PKI directory
  fs.rmdirSync(path);

  // Return and call the callback
  return(callback());
}
