const mongoose = require('mongoose')

const rightSchema = new mongoose.Schema({
    system_role_id:{ type: mongoose.Schema.Types.ObjectId, ref:"Systemrole"},
    right_name:{type: String, trim: true},

},{timestamps:true})


// Create a function to get the  model
const RightSchema = async (dbName)=>{
    const dbString = process.env.Mongoose_New_Db + '/' + dbName;
    console.log(dbString);
    const currentDb = mongoose.connection.name
    if (currentDb === dbName) {
        console.log("same");
        return mongoose.model('Right', rightSchema)
    }
    else {
        const conn = mongoose.connection.useDb(dbName)
        const rightSchema = conn.model('Right', rightSchema);
        return rightSchema;
    }
}
module.exports = RightSchema;