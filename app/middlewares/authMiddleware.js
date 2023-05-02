const jwt = require('jsonwebtoken')

const User = require('../models/adminEnd/user')
const NiamAdmin = require('../models/adminEnd/niamAdmin')

const checkUser = async (req,res,next)=>{
    try{
        const token = await req.cookies.jwt_token;
        if(token){
            jwt.verify(token,process.env.JWT_SECRET,async(err,decodedToken)=>{
                if(err){
                    res.status(403).json({success: false, message: "Token validation error"})
                }
                else{
                    const user = await User(req.session.db)
                    const userData = await user.findOne({_id:decodedToken.id}).select("-createdAt -updaedAt")
                    if(userData){
                        req.user = userData
                        next()
                    }
                    else{
                        res.status(403).json({success: false, messagge: "User validation user"})

                    }
                }
            })
        }
        else{
            res.status(404).json({ success: false, message: "No token to validate"})
        }
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

const adminCheck = async (req,res,next)=>{
    try{
        const token = await req.cookies.jwt_token;
        const sessionDetails = req.session
        if(token && sessionDetails){
            jwt.verify(token,process.env.JWT_SECRET,async(err,decodedToken)=>{
                if(err){
                    res.status(403).json({success: false, message: "Token validation error"})
                }
                else{
                    const niamAdmin = await NiamAdmin(sessionDetails.db)
                    const userData = await niamAdmin.findOne({_id:decodedToken.id}).select("-createdAt -updaedAt")
                    if(userData){
                        req.user = userData
                        next()
                    }
                    else{
                        res.status(403).json({success: false, messagge: "Unauthorised"})

                    }
                }
            })
        }
        else{
            res.status(404).json({ success: false, message: "No token to validate"})
        }
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

module.exports = {checkUser, adminCheck}