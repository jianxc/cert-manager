// Routes Array
var routes = {};
routes.get = {};
routes.post = {};

// Index GET Route
//
// The Index Route is a route that will return information regarding this API.
routes.get.index = require('./index/index');

// Logout POST Route
//
// The Logout Route is a route that allows the user to deauthenticate from the API.
routes.post.logout = require('./auth/logout');

// Export routes array
module.exports = routes;
