const User = require("../models/adminEnd/user")

function userController(){
   return{
    //loggedin user dashboard api
    async userDash(req,res){
        try{    
            const loggeduser = req.user
            const user = await User.findById(loggeduser._id).select('-createdAt -updatedAt').populate({path:"organization", select:"organizationName -_id"}).populate('organizationRoles appRoles apps');
            if(user){
                res.status(200).json({success:true, message:"User detais found",data:user})
            }
            else{
                res.status(404).json({success: false, message:"some error occured"})
            }
        }
        catch(err){
            res.status(500).json({success: false,message: err.message})
        }
    },
    //loggedin user
    
   }
}

module.exports = userController