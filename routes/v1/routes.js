// Routes Array
var routes = {};
routes.get = {};
routes.post = {};
routes.delete = {};

// Index GET Route
//
// The Index Route is a route that will return information regarding this API.
routes.get.index = require('./index/index');

// Login POST Route
//
// This route allows users to authenticate with the API.
routes.post.login = require('./auth/login');

// Logout POST Route
//
// This route allows users to deauthenticate from the API.
routes.post.logout = require('./auth/logout');

// PKI POST Route
//
// This route allows users to create a PKI directory.
routes.post.pki = require('./pki/create');

// PKI DELETE Route
//
// This route allows users to delete a PKI directory.
routes.delete.pki = require('./pki/delete');

// Export routes array
module.exports = routes;
