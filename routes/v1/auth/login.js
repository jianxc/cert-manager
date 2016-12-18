// Dependencies
var send = require('../../../lib/response/sender'),
    errors = require('../../../lib/response/errors'),
    Account = require('../../../lib/database/schemas/account'),
    bcrypt = require('bcryptjs');

// Login POST Function
module.exports = function(req, res, next) {
  // Session
  var session = req.session;

  // Username from request body
  var username = req.body.username;
  // Password from request body
  var password = req.body.password;

  // Determine if user is already authenticated
  if (session.uid) {
    // Send a response without data or errors
    return(send(res));
  }

  // Determine if username or password is not set
  if (!(username && password)) {
    // Send a response with an invalid_parameters error
    return(send(res, null, [errors.invalid_parameters]));
  }

  // Attempt to authenticate the user
  Account.findOne({username: username}, function(err, account) {
    // Return and advance to the next route if an error occurs
    if (err) return(next(err));

    // Determine if results are undefined
    if (!account) {
      // Send a response with an incorrect_credentials error
      return(send(res, null, [errors.incorrect_credentials]));
    }

    // Compare the password to the account's password hash
    if (!bcrypt.compareSync(password, account.password)) {
      // Send a response with an incorrect_credentials error
      return(send(res, null, [errors.incorrect_credentials]));
    }

    // Determine if the account is suspended
    if (account.isSuspended) {
      // Send a response with a suspended_account error
      return(send(res, null, [errors.suspended_account]));
    }

    // Store the user's account ID in the session
    session.uid = account._id;

    // Send a response without data or errors
    return(send(res));
  });
}
