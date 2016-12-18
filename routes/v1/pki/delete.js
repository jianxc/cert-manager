// Dependencies
var send = require('../../../lib/response/sender'),
    errors = require('../../../lib/response/errors'),
    datastore = require('../../../lib/datastore/datastore');

// PKI DELETE Route
module.exports = function(req, res) {
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
  datastore.deletePKI(directory, function(err) {
    // Determine if an error occurred
    if (err && err.message == '!exists') {
      // Send a response with a not_found error
      return(send(res, null, [errors.not_found]));
    } else if (err) {
      // Advance to next route
      return(next(err));
    }

    // Send a response without data or errors
    return(send(res));
  });
}
