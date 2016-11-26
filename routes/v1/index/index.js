// Dependencies
var generate = require('../../../lib/response/generator'),
    version = require('../../../package.json').version;

// Index GET Function
module.exports = function(req, res) {
  // Send information about the API
  res.send(generate({serverVersion: version, apiVersion: 1}));
}
