// Dependencies
var send = require('../../../lib/response/sender');

// Logout POST Function
module.exports = function(req, res) {
  // Session
  var session = req.session;

  // Destroy the session
  session.destroy();

  // Send a response without data or errors
  send(res);
}
