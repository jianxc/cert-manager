// Dependencies
var send = require('../../../lib/response/sender'),
    version = require('../../../package.json').version;

// Index GET Function
module.exports = function(req, res) {
  // Send a response with information about the API
  return(send(res, {serverVersion: version, apiVersion: 1}));
}
