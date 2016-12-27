// Dependencies
var fs = require('fs'),
    Directory = require('../../database/schemas/directory'),
    config = require('../../../config');

// Delete PKI Function
module.exports = function(data, callback) {
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
