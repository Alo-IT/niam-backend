const express = require('express');
const router = express.Router();
const organizationController = require('../../app/controllers/organizationController')

 




router.get('/organization',organizationController().getAnOrganization)             // fetch an organization info or search for an organization

router.patch('/organizations/:id', organizationController().updateAnOrganization)        // update an organization info


router.post('/validate-domain', organizationController().searchOrganizations)           // search   for an organization
router.get('/getemployees', organizationController().getOrganizationEmployees)          // get an organization employee list
router.get('/getapps/:id', organizationController().getAllAppsUnderOrg)                 //get all apps under an organization
router.get('/approles/:id', organizationController().getAllRolesOfApp)                  // get all roles of an application 

//provide new role to user


module.exports = router