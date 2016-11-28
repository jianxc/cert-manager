// Dependencies
var send = require('../../../lib/response/sender'),
    version = require('../../../package.json').version;

// Index GET Function
module.exports = function(req, res) {
  // Send a response with information about the API
  send(res, {serverVersion: version, apiVersion: 1});
}
