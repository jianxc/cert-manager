// Dependencies
var send = require('../../../lib/response/sender'),
    errors = require('../../../lib/response/errors'),
    datastore = require('../../../lib/datastore/datastore');

// PKI POST Route
module.exports = function(req, res, next) {
  // Session
  var session = req.session;

  // Directory Name
  var name = req.body.name;
  // Directory Description
  var description = req.body.description;
  // Directory Slug
  var slug = req.params.slug;

  // Determine if the user is authenticated
  if (!session.uid) {
    // Send a response with an unauthenticated error
    return(send(res, null, [errors.unauthenticated]));
  }

  // Determine if name or slug is not set
  if (!(name && slug)) {
    // Send a response with an invalid_parameters error
    return(send(res, null, [errors.invalid_parameters]));
  }

  // PKI directory parameters
  var parameters = {name: name, description: description, slug: slug, members: [{uid: session.uid}]};

  // Attempt to initalize the PKI directory
  datastore.initializePKI(parameters, function(err) {
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
