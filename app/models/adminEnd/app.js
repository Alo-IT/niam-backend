const mongoose = require('mongoose');

// App schema
const appSchema = new mongoose.Schema({
    appName:{type: String, required: true, trim: true},
    appOwner: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    appsManager: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    opsManager: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    appRoles: [{type: mongoose.Schema.Types.ObjectId, ref: "AppRole"}],
    organizationId:{type: mongoose.Schema.Types.ObjectId,required: true},
    // approval_flow: [{type: String, trim:true}]
    appStatus:{type:Boolean, default: true}
    
  },{timestamps: true});
  
  
  const App = async (dbName) => {
    const dbString = process.env.Mongoose_New_Db + '/' + dbName;
    console.log(dbString);
    const currentDb = mongoose.connection.name
    if (currentDb === dbName) {
        console.log("same");
        return mongoose.model('App', appSchema)
    }else {
        const conn = mongoose.connection.useDb(dbName)
        const AppSchema = conn.model('App', appSchema);
        return AppSchema;
    }
    
  
  }
  module.exports = App;