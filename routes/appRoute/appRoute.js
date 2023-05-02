const express = require('express');
const router = express.Router();
const appController = require("../../app/controllers/appController")

router.get('/app', appController().getAllApps)          //get all apps
router.post('/app', appController().addApp)             //add new app
router.get('/app/:id',appController().getAppById)       //get app by id     
router.patch('/app/:id', appController().updateApp)     //update app
router.delete('/app/:id', appController().deleteApp)    //delete app


module.exports = router