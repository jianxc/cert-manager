// Dependencies
var mongoose = require('mongoose');

// Directory Schema
var directorySchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  slug: {type: String, required: true, unique: true},
  members: [{
    _id: false,
    uid: {type: mongoose.Schema.Types.ObjectId, required: true}
  }]
});

// Export the model of the schema
module.exports = mongoose.model('Directory', directorySchema);
