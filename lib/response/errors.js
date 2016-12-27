// Errors Array
var errors = {};

// Not Found Error
errors.not_found = {name: 'not_found', statusCode: 404};

// Internal Server Error
errors.internal_server_error = {name: 'internal_server_error', statusCode: 500};

// Invalid Parameters Error
errors.invalid_parameters = {name: 'invalid_parameters', statusCode: 400};

// Incorrect Credentials Error
errors.incorrect_credentials = {name: 'incorrect_credentials', statusCode: 400};

// Suspended Account Error
errors.suspended_account = {name: 'suspended_account', statusCode: 403};

// Unauthenticated Error
errors.unauthenticated = {name: 'unauthenticated', statusCode: 401};

// Export the errors array
module.exports = errors;
