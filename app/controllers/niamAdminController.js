const NiamORG = require('../models/adminEnd/niam')
const User = require('../models/adminEnd/user')
const Organization = require('../models/adminEnd/organization')
const mongoose = require('mongoose')
const connection = require('../db/dbConnection')


function niamAdminController() {
  return {
    //add organization and its db from niam admin
    async addOrganization(req, res) {
      try {
        // Save org list details in main database
        // let conn = connection(process.env.Initial_Db)
        let NiamOrg = await NiamORG(process.env.Initial_Db)
        const checkOrg = await NiamOrg.findOne({orgDomain:req.body.orgDomain})
        if(checkOrg){
          res.status(400).json({ success: false, message: 'Organization already exists.' })
        }else{
          const org = new NiamOrg(req.body);
        const saveOrg = await org.save();


        // Create new collection and save data in new database
        const data = {
          organizationName: org.dbName,
          orgDomain: org.orgDomain,
          userTyre: 10000,
        };
        const OrganizationModel = await Organization(org.dbName)
        
        const saveData = new OrganizationModel(data);
        const saveOrgInfo = await saveData.save()
        saveOrgInfo
          ? res.status(201).json({ success: true, message: 'Created successfully' })
          :
          res.status(400).json({ success: false, message: 'Error' });
        }
        
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
      }
    },
    //search organization and login
    async searchOrganization(req, res) {
      try {
        const NiamOrg = await NiamORG(process.env.Initial_Db)
        const orgInfo = await NiamOrg.findOne({ orgDomain: req.body.orgDomain })
        const org = await Organization(orgInfo.dbName)
        const orgFullinfo = await org.find({})
        console.log(orgFullinfo);
        req.session.db = orgInfo.dbName
        console.log(req.session.db);
        res.status(200).json({ success: true, message: "Organization found.", data: orgFullinfo })
      }
      catch (err) {
        res.status(500).json({ success: false, message: err.message })
      }
    },
    //add admin for that organization
    async addAdminForOrganization(req, res) {
      try {
        if(req.session.db){
          console.log("Db name",req.session.db);
          const user = await User(req.session.db)
          const addorgAdmin = new user(req.body)
          const saveAdmin = await addorgAdmin.save()
          saveAdmin ? res.status(200).json({success:true, message: "Admin created for this org"})
          :
          res.status(400).json({success: false, message: "Admin creation failed"})

        }else{
          res.status(403).json({success: false, message: "Authorization error"})
        }
      }
      catch (err) {
        console.log(err);
        res.status(500).json({success:false, message: err.message})
      }
    },

    //get organization and its info
    async getOrganizationInfo(req, res) {
      try {

        let NiamOrg = await NiamORG(process.env.Initial_Db)
        const org = await NiamOrg.findOne({ orgDomain: req.body.orgDomain })
        console.log(mongoose.connection.name);

        const OrganizationModel = await Organization(org.dbName)
        const orgInfo = await OrganizationModel.find({})
        console.log(mongoose.connection.name);

        res.status(200).json({ success: true, message: "Data found", data: { org: org, orgInfo: orgInfo } })
      }
      catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
      }
    }


  }
}

module.exports = niamAdminController