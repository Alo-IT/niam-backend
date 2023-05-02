const express = require('express');
const router = express.Router();
const {checkUser} = require('../../app/middlewares/authMiddleware')
const userController = require('../../app/controllers/userController')

router.get('/user', checkUser, userController().userDash)


module.exports = router