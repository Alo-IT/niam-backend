const Organization = require('../models/adminEnd/organization')
const User = require('../models/adminEnd/user')

const CryptoJS = require('crypto-js')


function adminController() {
  return {
    // Get all users
    async getAllUser(req, res, next) {
      try {
        // await User.deleteMany()
        const users = await User.find().select('-password');

        res.status(200).json({ success: true, message: "Users found", data: users })
      } catch (err) {
        next(err);
      }
    },
    // Get a user by id
    async getAuserByid(req, res, next) {
      try {
        const user = await User.findById(req.params.id).select("-password");
        res.json(user);
      } catch (err) {
        next(err);
      }
    },

    // Add a new user
    async addNewUser(req, res, next) {
      try {
        
        let reqBody = new User(req.body)
        delete reqBody.password
        let pass = CryptoJS.AES.encrypt(req.body.password, process.env.HASH_SECRET)
        reqBody.password = pass
        reqBody.uid = req.uid
        const signup = await reqBody.save()
        signup ? res.status(200).json({ success: true, message: "Signup successful." })
          :
          res.status(403).json({ success: false, message: "Can't signup" })
      } catch (err) {
        next(err);
      }
    },

    // Update an existing user
    async updateExistingUser(req, res, next) {
      try {
        const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
        res.json(result);
      } catch (err) {
        next(err);
      }
    },

    //delete a user by id
    async deleteAuserById(req, res, next) {
      try {
        const result = await User.findByIdAndDelete(req.params.id);
        res.json(result);
      } catch (err) {
        next(err);
      }
    },

    

    

   
  
    
    // Get all organizations
    async getAllOrganization(req, res, next) {
      try {
        const organizations = await Organization.find();
        res.json(organizations);
      } catch (err) {
        next(err);
      }
    },
    // Get an organization by id
    async getAorganizationById(req, res, next) {
      try {
        const organization = await Organization.findById(req.params.id);
        res.json(organization);
      } catch (err) {
        next(err);
      }
    },
    //add n new organization
    async AddNewOrganiaztion(req, res, next) {
      try {       
    
        const organization = new Organization(req.body);
        await organization.save();
        res.status(201).json({ success: true, message: "inserted" });
      } catch (error) {
        res.status(400).json({success: false, message:error.message});
      }
    },
    //update organization
    async updateExistingOrganization(req, res, next) {
      try {
        const result = await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true })
        // result ? {const rar = 101 res.status(200).json({success: true, message: "Updated"}) }: {res.status(404).json()}
        if (result) {
          res.status(200).json({ success: true, message: "Updated" })
        }
        else {
          res.status(401).json({ success: false, message: "Can't update organization" })
        }
      }
      catch (err) {
        res.status(500).json({ success: false, message: err.message })
      }
    },
    //delete organization
    async deleteOrganization(req, res, next) {
      try {
        const result = await Organization.findByIdAndDelete(req.params.id)
        if (result) {
          res.status(200).json({ success: true, message: "Deleted" })
        }
        else {
          res.status(401).json({ success: false, message: "Can't delete organization" })
        }
      }
      catch (err) {
        res.status(500).json({ success: false, message: err.message })
      }
    },
    //SEARCH for organizations
    async searchOrganizations(req,res){
      try{
        //find organization by its domain name
        const org = await Organization.findOne({orgDomain: req.body.organizationDomain.trim()})
        org ? res.status(200).json({success: true, message: "Organization exists."}) : res.status(404).json({success: false, message: 'No organization found'})

      }
      catch(err){
        res.status(500).json({success: false, message:err.message});
      }
    },
    

  }
}

module.exports = adminController