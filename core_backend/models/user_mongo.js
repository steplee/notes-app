
var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var user_schema = new Schema({
  email: String,
  username: String,
  password: String,

  deckStates: [Schema.Types.ObjectId],
  decksCreated: [Schema.Types.ObjectId],

  lastActive: Date
});


var user_model = mongoose.model('user', user_schema);
