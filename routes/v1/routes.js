// Routes Array
var routes = {};
routes.get = {};

// Index GET Route
//
// The Index Route is a route that will return information regarding this API.
routes.get.index = require('./index/index');

// Export routes array
module.exports = routes;
