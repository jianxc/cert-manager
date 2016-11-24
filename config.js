// Configuration Array
var config = {};
config.web = {};
config.cert = {};
config.db = {};

// Web Port
//
// This is the port that the web server will listen on.
config.web.port = 8080;

// OpenSSL Binary Location
//
// This is the location of the OpenSSL binary that will be used for certificate
// related operations.
config.cert.openssl = 'openssl';

// Certificate Data Location
//
// This is the location where all certificate data will be stored. The default is
// the directory that this program runs in.
config.cert.data = 'data/';

// Database Host
//
// This is the host of the database that will be connected to. The default is
// localhost.
config.db.host = '127.0.0.1';

// Database Port
//
// This is the port of the database that will be connected to. The default is
// the default MongoDB port.
config.db.port = 27017;

// Database Name
//
// This is the name of the database that will be connected to. The default is
// 'cert-manager'.
config.db.name = 'cert-manager';

// Database Options
//
// This is a list of options that will be used when connecting to the database.
// A full list of options can be found on http://mongoosejs.com/docs/connections.html
// under the 'Options' header.
// Example: config.db.options = {user: 'username', pass: 'password'};
config.db.options = {};

// Database Path
//
// This is the compiled path to the database generated from the options above.
// This usually does not require modification unless you are using advanced options.
config.db.path = ['mongodb://', config.db.host, ':', config.db.port, '/', config.db.name].join('');

// Export the configuration array
//
// This allows other files to access the configuration options listed above. Modifying this
// may result in unexpected behaviour.
module.exports = config;
