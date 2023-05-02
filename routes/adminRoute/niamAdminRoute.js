const express = require('express');
const router = express.Router();
const niamAdminController = require('../../app/controllers/niamAdminController');
const {adminCheck} = require('../../app/middlewares/authMiddleware')


router.post('/organization', niamAdminController().addOrganization)             // add organization by niam admin
router.post('/orginfo',adminCheck, niamAdminController().getOrganizationInfo)               // get organization information
router.post('/searchorg', niamAdminController().searchOrganization)     // search organization from dash 1
router.post('/addorgadmin', niamAdminController().addAdminForOrganization)      //add organization admin


module.exports = router