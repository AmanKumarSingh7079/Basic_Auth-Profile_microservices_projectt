
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

userId:{
  type: String,
  required : true,
  unique: true
},
email:{
type: String,
required: true,
unique: true
},
username: {
  type: String,
  required :true
},
about:{
  type: String},
  contacts:{
    type: Number,
    
  }
}, {timestamps: true});

module.exports = mongoose.model('UserProfile', UserSchema)