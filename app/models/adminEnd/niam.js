const mongoose = require('mongoose');


const niamORGSchema = new mongoose.Schema({
    orgDomain: { type: String, trim: true, unique:true },
    dbName: { type: String, trim: true, set: function(value){
        return value.replace(/\s/g,'');  //remove all spaces
    } }
}, { timestamps: true })

// Create a function to get the  model
const NiamORG = async (dbName) => {
    const dbString = process.env.Mongoose_New_Db + '/' + dbName;
    console.log(dbString);
    const currentDb = mongoose.connection.name
    if (currentDb === dbName) {
        console.log("same");
        return mongoose.model('Org', niamORGSchema)
    }
    else {
        const conn = mongoose.connection.useDb(dbName)
        const NiamORGModel = conn.model('Org', niamORGSchema);
        return NiamORGModel;
        
    }

}

module.exports = NiamORG;
