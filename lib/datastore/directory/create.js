// Dependencies
var fs = require('fs'),
    Directory = require('../../database/schemas/directory'),
    config = require('../../../config');

// Create PKI Function
module.exports = function(data, callback) {
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
