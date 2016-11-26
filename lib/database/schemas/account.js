// Dependencies
var mongoose = require('mongoose');

// Account Schema
var accountSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  displayName: {type: String},
  isSuspended: {type: Boolean, default: false}
});

// Export the model of the schema
module.exports = mongoose.model('Account', accountSchema);
