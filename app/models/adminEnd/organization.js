const mongoose = require('mongoose');


const organizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true
  },
  orgDomain: {
    type: String,
    required: true,
    unique: true
  },
  oAuth: {
    type: [String],
    enum: ['Google', 'Microsoft', 'Linkedin'],
    required: true
  },
  thirdPartyOrg: [{ name: { type: String, trim: true }, domain: { type: String, trim: true } }],
  organizationRoles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrganizationRole",
    default: null
  }],
  apps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "App",
    default: null
  }],
  userTyre: {
    type: Number,
    default: null,
  }
}, { timestamps: true });

// Create a function to get the organization model
const Organization = async (dbName) => {
  const currentDb = mongoose.connection.name
  if (currentDb === dbName) {
    console.log("same");
    return mongoose.model('OrgInfo', organizationSchema)
  }
  else {
    const conn = mongoose.connection.useDb(dbName)
    const OrganizationModel = conn.model('OrgInfo', organizationSchema);
    return OrganizationModel;
  }

}

module.exports = Organization;


