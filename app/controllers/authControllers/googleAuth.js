// const {oAuth} = require('google-auth-library')

function gooleAuthController(){
    return{
        //google login
        async googlelogin(req,res){
            try{
                const token = req.body.tokenId
                //import google-auth-library
                client.verifyIdToken({idToken:token,audience:''}).then((response=>{
                    const {email_verified,name,email} = response.payload;
                }))
            }
            catch(err){
                res.status(500).json({success:false, message:err.message})
            }
        }
    }
}