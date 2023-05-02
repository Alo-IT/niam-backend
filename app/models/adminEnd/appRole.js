const mongoose = require('mongoose');

const appRoleSchema = new mongoose.Schema({
    roleName: {type: String, required: true},
    appId:{type: mongoose.Schema.Types.ObjectId, ref: "App", required: true},
    approvalFlow:[{type: String, trim: true}]

  },{timestamps: true});
  
 
 const AppRole = async (dbName) => {
  const dbString = process.env.Mongoose_New_Db + '/' + dbName;
  console.log(dbString);
  const currentDb = mongoose.connection.name
  if (currentDb === dbName) {
      console.log("same");
      return mongoose.model('AppRole', appRoleSchema)
  }else {
      const conn = mongoose.connection.useDb(dbName)
      const AppRoleSchema = conn.model('AppRole', appRoleSchema);
      return AppRoleSchema;
  }
  

}
module.exports = AppRole;