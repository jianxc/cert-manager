// Dependencies
var generate = require('../../../lib/response/generator');

// Logout POST Function
module.exports = function(req, res) {
  // Session
  var session = req.session;

  // Destroy the session
  session.destroy();

  // Send the response
  res.send(generate());
}
