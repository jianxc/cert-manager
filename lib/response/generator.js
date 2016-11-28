// Response Generator Function
module.exports = function(status, data, errors) {
  // Determine the response structure from status
  switch(status) {
    case 'error':
      return({status: status, data: data, errors: errors});
    default:
      return({status: status, data: data});
  }
}
