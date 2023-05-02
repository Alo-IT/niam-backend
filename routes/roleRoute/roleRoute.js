const express = require('express');
const router = express.Router();
const roleController = require('../../app/controllers/roleController')

/* *|  Organization role routes  |* */

router.post('/roles', roleController().addNewOrgRole)              //add  new role
router.get('/roles', roleController().getAllOrgRoles)              //get all roles
router.get('/roles/:id', roleController().getOrgroleById)         //get a role by id
router.patch('/roles/:id', roleController().updateOrgRole)        //update a role by id


/* *|  App role routes  |* */

router.get('/approle', roleController().getAllAppRole)          //get all apps roles
router.post('/approle', roleController().addNewAppRole)         //post a role
router.get('/approle/:id', roleController().getAppRoleById)     //get a role by id
router.patch('/approle/:id', roleController().editAppRole)      //update a role by id
router.delete('/approle/:id', roleController().deleteAppRole)   //delete a role by id




module.exports = router