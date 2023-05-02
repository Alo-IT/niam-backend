const express = require('express');
const router = express.Router();
const authController = require('../../app/controllers/authControllers/authController')
const uidGenerator = require('../../app/middlewares/uid')
const {checkUser} = require('../../app/middlewares/authMiddleware')

router.post('/signup',uidGenerator, authController().signUpUser)    //signup user
router.post('/login', authController().signIn)                      //login user
router.post('/password',checkUser, authController().changePassword) //change password



router.post('/niamadmin',authController().niamAdminSignUp)          //niamadmin sign up user
router.post('/niamadminlogin', authController().niamAdminSignIn)   //niamadmin login 


router.get('/user', authController().getAllUser)                     //get all users
router.get('/google', authController().passportGoogleAuth)            //get google url: http://localhost:4000/api/auth/google?org=amino
router.get('/google/callback', authController().googleAuthCallback)         

router.get('/office', authController().office365Auth)               //initializae office login page office url: http://localhost:4000/api/auth/office
router.get('/office/callback', authController().office365AuthCallback)    //here the callback from office hits and information provides




router.get('/error',authController().authFail)


module.exports = router