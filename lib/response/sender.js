// Dependencies
var generate = require('./generator');

// Response Sender Function
module.exports = function(res, data, errors) {
  // Default status
  var status = 'success';
  // Default status code
  var statusCode = 200;

  // Determine if any errors were reported
  if (errors) {
    // Set status to error
    status = 'error';

    // Statuses array
    var statuses = [];

    // Process errors
    for (i = 0; i < errors.length; i++) {
      // Append the error's status code to the statuses array
      statuses.push(errors[i].statusCode);

      // Update error to only contain the error name
      errors[i] = {error: errors[i].name};
    }

    // Determine if multiple statuses are involved
    if (statuses.length > 1) {
      // Set statusCode to 207 Multi-Status
      statusCode = 207;
    } else {
      // Set statusCode to the status of the error
      statusCode = statuses[0];
    }
  }

  // Set data to null if it is undefined
  if (!data) {
    data = null;
  }

  // Set response status code
  res.status(statusCode);

  // Send generated response
  res.send(generate(status, data, errors));
}
