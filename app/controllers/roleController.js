const mongoose = require('mongoose');

const AppRole = require('../models/adminEnd/appRole')

function roleController(){
    return{


//****************************************************************//
        /* *| Organization Role controller |* */
// **************************************************************//

        // Add a new organization role
        async addNewOrgRole(req,res){
            try {
              // await OrganizationRole.deleteMany()
                const role = new OrganizationRole(req.body);
                await role.save();
                res.status(201).json({success: true, message: 'Organization Role added.'})
              } catch (error) {
                res.status(400).send(error);
              }
        },
        // Get all organization roles
        async getAllOrgRoles(req,res){
            try {
                const roles = await OrganizationRole.find({});
                res.status(200).json({success: true, message: 'Organization all roles found', data: roles})
              } catch (error) {
                res.status(500).json({success: true, message: error.message});
              }
        },
        // Get an organization role by ID
        async getOrgroleById(req,res){
            try {
                const role = await OrganizationRole.findById(req.params.id);
                if (!role) {
                  return res.status(404).send();
                }
                res.status(200).json({success: true, message:"Organization role found", data: role});
              } catch (error) {
                res.status(500).json({success: false, message: error.message});
              }
        },
        // Update an organization role by ID
        async updateOrgRole(req,res){
            // const updates = Object.keys(req.body);
            // const allowedUpdates = ['roleType', 'access'];
            // const isValidOperation = updates.every(update => allowedUpdates.includes(update));
          
            if (!isValidOperation) {
              return res.status(400).send({ error: 'Invalid updates!' });
            }
          
            try {
              const role = await OrganizationRole.findByIdAndUpdate(req.params.id, req.body, { new: true});
          
              if (!role) {
                return res.status(404).send();
              }
          
              res.send(role);
            } catch (e) {
              res.status(400).send(e);
            }
        },


//****************************************************************//
        /* *| App Role controller |* */
// **************************************************************//
        //add new app role
        async addNewAppRole(req,res){
          try{
            // await AppRole.deleteMany()
            const newAppRoles = req.body.map((appRoles)=>new AppRole(appRoles))
            
            const savedAppRole = await Promise.all(newAppRoles.map(role=> role.save()));
            // const rolesIds = savedAppRole.map((role_id)=>role_id)   //uncomment if needed to send added roles

            savedAppRole ? res.status(200).json({success: true, message: "App roles added", })
            :
            res.status(404).json({success: false, message:"Can't save roles"})
          }
          catch(err){
            res.status(500).json({success: false, message: err.message});
          }
        },
        //get all app roles
        async getAllAppRole(req,res){
          try{
            const roles = await AppRole.find({}).populate("appId")
            roles.length  > 0 ? res.status(200).json({success: true, message:"App roles found", data:roles}) 
            : 
            res.status(404).json({success:false, message:"Can't find App roles"})
          }
          catch(err){
            res.status(500).json({success: false, message:err.message});
          }
        },
        async getAppRoleById(req,res){
          try{
            const roles = await AppRole.findById(req.params.id)
            roles ? res.status(200).json({success: true, message:"App roles found", data:roles})
            :
            res.status(400).json({success: false, message:"App roles not found"})
          }
          catch(err){
            res.status(500).json({success: false, message:err.message});
          }
        },
        ///edit app role
        async editAppRole(req, res){
          try{
            const reqBody = req.body;
            const editAppRole = await AppRole.findByIdAndUpdate(req.params.id, reqBody)
            editAppRole ? res.status(200).json({success: true, message:"App role updated"}) 
            : 
            res.status(400).json({success: false, message:"Can't edit"});
          }
          catch(err){
            res.status(500).json({success: false, message:err.message});
          }
        },
        //delete an app role
        async deleteAppRole(req, res){
          try{
            const deleteApp = await AppRole.findByIdAndDelete(req.params.id)
            deleteApp ? res.status(200).json({success:true,message:"App role deleted"}) 
            : 
            res.status(400).json({success:false,message:"App role can't delete."})
        }
        catch(err){
            res.status(500).json({success:false,message:err.message})
        }
        },
        
        

    }
}

module.exports = roleController