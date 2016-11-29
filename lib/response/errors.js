// Errors Array
var errors = {};

// Not Found Error
errors.not_found = {name: 'not_found', statusCode: 404};

// Invalid Credentials Error
errors.invalid_credentials = {name: 'invalid_credentials', statusCode: 400};

// Incorrect Credentials Error
errors.incorrect_credentials = {name: 'incorrect_credentials', statusCode: 400};

// Suspended Account Error
errors.suspended_account = {name: 'suspended_account', statusCode: 403};

// Export the errors array
module.exports = errors;
