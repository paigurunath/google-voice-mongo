var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserDetails = new Schema({
userId:{
 type:String,
 required:false
},
conversationId:{
 type:String,
 required:false
},
mobile:{
  type:String,
  required:false
},
email:{
  type:String,
  required:false
},
timestamp:{
  type:String,
  required:true
}
});
module.exports = mongoose.model('UserDetails', UserDetails);