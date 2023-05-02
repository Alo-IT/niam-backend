const mongoose = require('mongoose')

const systemRoleFlowSchema = new mongoose.Schema({
    system_role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Systemrole" },
    flow: [{ type: String, trim: true }],

}, { timestamps: true })

// Create a function to get the  model
const SystemRoleApprovalFlow = async (dbName) => {
    const dbString = process.env.Mongoose_New_Db + '/' + dbName;
    console.log(dbString);
    const currentDb = mongoose.connection.name
    if (currentDb === dbName) {
        console.log("same");
        return mongoose.model('Systemroleflow', systemRoleFlowSchema)
    }
    else {
        const conn = mongoose.connection.useDb(dbName)
        const systemRoleFlow = conn.model('Systemroleflow', systemRoleFlowSchema);
        return systemRoleFlow;
    }
}
module.exports = SystemRoleApprovalFlow;