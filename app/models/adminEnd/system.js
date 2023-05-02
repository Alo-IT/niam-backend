const mongoose = require('mongoose');

const systemSchema = new mongoose.schema({
    system_Name: { type: String, trim: true, required: true },
    parent_App: { type: mongoose.Schema.Types.ObjectId, ref: "App" },
    system_owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    system_admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

}, { timestamps: true })

// Create a function to get the  model
const System = async (dbName) => {
    const dbString = process.env.Mongoose_New_Db + '/' + dbName;
    console.log(dbString);
    const currentDb = mongoose.connection.name
    if (currentDb === dbName) {
        console.log("same");
        return mongoose.model('System', systemSchema)
    }
    else {
        const conn = mongoose.connection.useDb(dbName)
        const SystemSchema = conn.model('System', systemSchema);
        return SystemSchema;
    }


}
module.exports = System;