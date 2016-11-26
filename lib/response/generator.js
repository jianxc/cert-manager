// Response Generator Function
module.exports = function(data, errors) {
  // Default status
  var status = 'success';

  // Determine if any errors were reported
  if (errors) {
    // Set status to error
    status = 'error';

    // Return generated response with errors
    return({status: status, data: data, errors: errors});
  }

  // Return generated response without errors
  return({status: status, data: data});
}
