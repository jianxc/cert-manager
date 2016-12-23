// Dependencies
var send = require('../../../lib/response/sender'),
    errors = require('../../../lib/response/errors'),
    datastore = require('../../../lib/datastore/datastore');

// PKI DELETE Route
module.exports = function(req, res) {
  // Session
  var session = req.session;

  // Directory Slug
  var slug = req.params.slug;

  // Determine if the user is authenticated
  if (!session.uid) {
    // Send a response with an unauthenticated error
    return(send(res, null, [errors.unauthenticated]));
  }

  // Determine if slug is not set
  if (!slug) {
    // Send a response with an invalid_arameters error
    return(send(res, null, [errors.invalid_parameters]));
  }

  // Attempt to delete the PKI directory
  datastore.deletePKI({slug: slug}, function(err) {
    // Determine if an error occurred
    if (err) {
      // Determine if the error's message is !exists
      if (err.message == '!exists') {
        // Send a response with a not_found error
        return(send(res, null, [errors.not_found]));
      } else {
        // Advance to next route
        return(next(err));
      }
    }

    // Send a response without data or errors
    return(send(res));
  });
}
