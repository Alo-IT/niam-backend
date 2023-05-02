const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: 'Invalid email address'
  },
  password: { type: String, trim: true, required: true },
  adminType: { type: String, enum: ['admin', 'moderator'], default: "moderator", trim: true }

}, { timestamps: true })



const NiamAdmin = async (dbName) => {
  const dbString = process.env.Mongoose_New_Db + '/' + dbName;
  console.log(dbString);
  const currentDb = mongoose.connection.name
  if (currentDb === dbName) {
    console.log("same");
    return mongoose.model('Admin', AdminSchema)
  }
  else {
    const conn = mongoose.connection.useDb(dbName)
    const NiamAdminModel = conn.model('Admin', AdminSchema);
    
    return NiamAdminModel;
  }
}

module.exports = NiamAdmin;
