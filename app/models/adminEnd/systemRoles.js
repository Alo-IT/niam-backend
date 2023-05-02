const mongoose = require('mongoose')

const systemRoleSchema = new mongoose.Schema({
    system_id:{type:mongoose.Schema.Types.ObjectId, ref:"System"},
    role_name:{type:String, trim:true},
},{timestamps:true})


// Create a function to get the  model
const SystemRole = async (dbName) => {
    const dbString = process.env.Mongoose_New_Db + '/' + dbName;
    console.log(dbString);
    const currentDb = mongoose.connection.name
    if (currentDb === dbName) {
        console.log("same");
        return mongoose.model('Systemrole', systemRoleSchema)
    }
    else {
        const conn = mongoose.connection.useDb(dbName)
        const roleSchema = conn.model('Systemrole', systemRoleSchema);
        return roleSchema;
    }


}
module.exports = SystemRole;