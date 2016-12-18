// Dependencies
var send = require('../../../lib/response/sender'),
    errors = require('../../../lib/response/errors'),
    datastore = require('../../../lib/datastore/datastore');

// PKI POST Route
module.exports = function(req, res, next) {
  // Session
  var session = req.session;

  // Directory
  var directory = req.params.directory;

  // Determine if the user is authenticated
  if (!session.uid) {
    // Send a response with an Unauthenticated error
    return(send(res, null, [errors.unauthenticated]));
  }

  // Attempt to initalize the PKI directory
  datastore.initializePKI(directory, function(err) {
    // Determine if an error occurred
    if (err && err.message == 'exists') {
      // Send a response with an already_exists error
      return(send(res, null, [errors.already_exists]));
    } else if (err) {
      // Advance to next route
      return(next(err));
    }

    // Send a response without data or errors
    return(send(res));
  });
}
