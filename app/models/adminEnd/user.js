const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: 'Invalid email address'
  },
  authType: {
    type: [String],
  },
  org_role:{type:String, trim:true, enum:["USER","ORG_ADMIN"],default:"USER"},
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  apps:[{type: mongoose.Schema.Types.ObjectId, ref:"App"}],
  appRoles:[{type: mongoose.Schema.Types.ObjectId,ref: "AppRole"}],
  uid: {
    type: String,
    trim:true
  },
  password: {
    type: String,
    trim:true  
  }
},{timestamps: true});

// Create a function to get the  model
const User = async (dbName) => {
  const dbString = process.env.Mongoose_New_Db + '/' + dbName;
  console.log(dbString);
  const currentDb = mongoose.connection.name
  if (currentDb === dbName) {
      console.log("same");
      return mongoose.model('User', userSchema)
  }
  else {
      const conn = mongoose.connection.useDb(dbName)
      const UserSchema = conn.model('User', userSchema);
      return UserSchema;
  }
  

}
module.exports = User;

