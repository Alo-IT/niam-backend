const { response } = require("express");
const Organization = require("../models/adminEnd/organization")
const AppRole = require('../models/adminEnd/appRole')
const User = require('../models/adminEnd/user')
const App = require('../models/adminEnd/app')
const NiamORG = require('../models/adminEnd/niam')
function organizationController() {
  return {




    // Get an organizations info
    async getAnOrganization(req, res) {
      try {
        if (!req.session.db) {
          return res.status(403).json({ success: false, message: "Unauthorized access to organization" })
        }
        const org = await Organization(req.session.db)
        const organization = await org.find()
        if (!organization) {
          return res.status(404).json({ success: false, message: "Organization details not found." })
        }
        res.status(200).json({ success: true, message: "Organization data found", data: organization })
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },

    //Update an organization by ID
    async updateAnOrganization(req, res) {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['organizationName', 'orgDomain', 'oAuth', 'apps', 'organizationRoles'];
      const isValidOperation = updates.every(update => allowedUpdates.includes(update));

      if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' });
      }

      try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) {
          res.status(404).send();
        }
        updates.forEach(update => organization[update] = req.body[update]);
        await organization.save();
        res.send({ organization });
      } catch (error) {
        res.status(400).send(error);
      }
    },


    //provide new role to user--------------------------------------------------------
    async provideAppRoleByOrg(req, res) {
      try {
        // const findAppRole = await AppRole.findById(req.body.appRoleId)
        // if(findApp){
        //   const findUser = await User.findById(req.body.userId)
        //   if(findUser){

        //   }
        // }
      }
      catch (err) {

      }
    },

    //SEARCH for organizations
    async searchOrganizations(req, res) {
      try {
        //find organization by its domain name
        const OrgList = await NiamORG(process.env.Initial_Db)
        const findOrganization = await OrgList.findOne({ orgDomain: req.body.orgDomain })
        const Org = await Organization(findOrganization.dbName)
        const org = await Org.findOne({ orgDomain: req.body.orgDomain.trim() })
        org ? res.status(200).json({ success: true, message: "Organization exists.", data: org }) : res.status(404).json({ success: false, message: 'No organization found' })

      }
      catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },

    //employees under this organization
    async getOrganizationEmployees(req, res) {
      try {
        const user = req.user
        if (mongoose.Types.ObjectId.isValid(user.organization)) {
          const allEmp = await User.find({ organization: user.organization }).populate({ path: "" })
          res.status(200).json({ success: true, message: "Employee found", data: allEmp })
        }
        else {
          res.status(404).json({ success: false, message: "Organization not found" })
        }
      }
      catch (err) {
        res.status(500).json({ success: false, message: err.message })
      }
    },
    //all apps under organization
    async getAllAppsUnderOrg(req, res) {
      try {
        const allapps = await App.find({ organizationId: req.params.id })
        if (allapps) {
          res.status(200).json({ success: true, message: "Apps found", data: allapps })
        }
        else {
          res.staus(400).json({ success: false, message: "Can't find data" })
        }

      }
      catch (err) {
        res.status(500).json({ success: false, message: err.message })

      }
    },

    //get all roles under an app
    async getAllRolesOfApp(req, res) {
      try {
        const allRoles = await AppRole.find({ appId: req.params.id })
        if (allRoles) {
          res.status(200).json({ success: true, message: "Roles found", data: allRoles })
        }
        else {
          res.status(400).json({ success: false, message: "Can't find roles" })
        }
      }
      catch (err) {
        res.status(500).json({ success: false, message: err.message })
      }
    }


  };
}

module.exports = organizationController
