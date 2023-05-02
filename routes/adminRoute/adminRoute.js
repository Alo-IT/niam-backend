const express = require('express');
const router = express.Router();
const adminController = require('../../app/controllers/adminController')
const uidGenerator = require('../../app/middlewares/uid')


router.get('/users', adminController().getAllUser)                              //get all user
router.get('/users/:id', adminController().getAuserByid)                        //get a user by id
router.post('/users',uidGenerator, adminController().addNewUser)                 //add new user (signup)
router.put('/users/:id', adminController().updateExistingUser)                  //update a existing user  
router.delete('/users/:id', adminController().deleteAuserById)                  //delete a user by id



router.get('/organizations', adminController().getAllOrganization)              //get all organization
router.get('/organizations/:id', adminController().getAorganizationById)        //get a organization by id
router.post('/organizations', adminController().AddNewOrganiaztion)             //add new organization
router.put('/organizations/:id', adminController().updateExistingOrganization) //update  organization
router.delete('/organizations/:id', adminController().deleteOrganization)       //delete organization
router.post('/validate-domain', adminController().searchOrganizations)          //validate domain  by domain searching  


module.exports = router