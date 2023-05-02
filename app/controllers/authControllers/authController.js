//security packages
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../../models/adminEnd/user");
const NiamAdmin = require("../../models/adminEnd/niamAdmin")
const passport = require("passport");
const { response } = require("express");
const crypto = require('crypto');
const bcrypt = require('bcrypt');


function authController() {
  return {
    //signup
    async signUpUser(req, res) {
      try {
        // await User.deleteMany()
        console.log(req.body);
        const user = await User(req.session.db)

        let reqBody = new user(req.body);

        delete reqBody.password;
        let pass = bcrypt.hashSync(req.body.password, 10);
        reqBody.password = pass;
        reqBody.uid = req.uid;
        console.log(reqBody);
        const signup = await reqBody.save();
        signup
          ? res
            .status(200)
            .json({ success: true, message: "Signup successful." })
          : res.status(403).json({ success: false, message: "Can't signup" });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },
    //niam admin signup
    async niamAdminSignUp(req, res) {
      try {
        const niamAdmin = await NiamAdmin(process.env.Initial_Db)
        let reqBody = new niamAdmin(req.body);
        delete reqBody.password;
        let pass = bcrypt.hashSync(req.body.password, 10)
        reqBody.password = pass;
        const signup = await reqBody.save();
        signup ? res.status(200).json({ success: true, message: "SignUp admin successfully" })
          :
          res.status(403).json({ success: false, message: "Can't signup" });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },
    //bulk signup
    async bulkSignup(req, res) {
      try {
        // const 
      }
      catch (err) {

      }
    },
    //signIn
    async signIn(req, res) {
      try {
        const user = await User.findOne({ email: req.body.email }).select('-createdAt -updatedAt').populate({ path: "organization", select: "organizationName -_id" }).populate('organizationRoles appRoles apps');
        if (!user) {
          res
            .status(400)
            .json({ success: false, message: "User is not registered" });
        } else {
          let hashedPass = bcrypt.compareSync(req.body.password, user.password);
          if (!hashedPass) {
            res.status(403).json({ message: "Pass or email didnt match" });
          }
          if (hashedPass) {
            const token = jwt.sign(
              { id: user._id, role: user.role },
              process.env.JWT_SECRET
            );

            const { password, ...others } = user._doc;
            //    req.session.currentUser= others
            res.cookie("jwt_token", token, {
              expires: new Date(new Date().getTime() + 10 * 86400000),
              httpOnly: true,
            });
            res
              .status(200)
              .json({ message: "User logedin", userDetails: others });
          }
        }
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },
    //niam admin login
    async niamAdminSignIn(req, res) {
      try {
        const niamAdmin = await NiamAdmin(process.env.Initial_Db)
        const user = await niamAdmin.findOne({ email: req.body.email }).select('-createdAt -updatedAt')
        if (!user) {
          res.status(404).json({ success: false, message: err.message });
        } else {
          let hashedPass = bcrypt.compareSync(req.body.password, user.password);
          if (!hashedPass) {
            res.status(403).json({ success: false, message: "Credential didnt match" });
          }
          if (hashedPass) {
            const token = jwt.sign(
              { id: user._id, role: user.adminType },
              process.env.JWT_SECRET
            );

            const { password, ...others } = user._doc;
            req.session.db = process.env.Initial_Db;
            req.session.user = others
            res.cookie("jwt_token", token, {
              expires: new Date(new Date().getTime() + 10 * 86400000),
              httpOnly: true,
            });
            res
              .status(200)
              .json({ message: "User logedin", userDetails: others });
          }
        }
      } catch (err) {

      }
    },
    //change password
    async changePassword(req, res) {
      try {
        console.log(req.body);
        const body = req.body;
        const userinfo = req.user;
        console.log(userinfo);
        let hashedPassword = bcrypt.compareSync(req.body.currentPassword, userinfo.password);
        if (hashedPassword) {
          console.log("matched");
          //update pass
          let pass = bcrypt.hashSync(req.body.newPassword, 10);

          const changePass = await User.findOneAndUpdate({ email: userinfo.email }, { password: pass });

          // const changePass = await User.findByIdAndUpdate(userinfo._id,{$set:{password:newPass}})
          changePass ? res.status(201).json({ success: true, message: "Password Updated", data: changePass })
            :
            res.status(401).json({ success: false, message: "Password Update failed" })
        }
      }
      catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
      }
    },

    //get all user
    async getAllUser(req, res) {
      try {
        const alluser = await User.find({}).populate("supervisor");
        if (alluser) {
          res
            .status(200)
            .json({ success: true, message: "All user found", data: alluser });
        } else {
          res.status(403).json({ success: false, message: "Can't fetch user" });
        }
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },

    //google login with registration
    async passportGoogleAuth(req, res) {
      try {

        if (req.query.org) {
          console.log("login called");
          const organization = req.query.org.toString();
          const state = JSON.stringify({ org: organization });
          //after scope it is now possible to send organization name
          passport.authenticate("google", { scope: ["profile", "email"], state })(req, res);
        } else {
          res.redirect("/api/auth/error");
        }

      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },

    //google auth callback function
    async googleAuthCallback(req, res) {
      try {

        passport.authenticate(
          "google",
          { failureRedirect: "/api/auth/error" },
          async (err, user, info) => {
            if (err) {
              res.redirect("/api/auth/error");
            }
            if (user) {
              console.log(user._json.email);
              const email = user._json.email;
              const userInfo = await User.findOne({ email: email.trim() })
              if (userInfo) {
                const token = jwt.sign({ id: userInfo._id, role: user.role }, process.env.JWT_SECRET)
                const { password, ...others } = userInfo._doc;
                res.cookie("jwt_token", token, {
                  expires: new Date(new Date().getTime() + 10 * 86400000), httpOnly: true,
                });
                res.status(200).json({ success: true, message: "Google user Logged-in", token: token, data: others })
              } else {
                const state = JSON.parse(req.query.state);
                const organization = state.org;
                const id = crypto.randomBytes(4).toString('hex').toUpperCase();
                let jointValue = user._json.given_name.concat('_', id);
                jointValue = organization.concat('_', jointValue)

                const newUser = new User({
                  firstName: user._json.given_name.trim(),
                  lastName: user._json.family_name.trim(),
                  email: user._json.email.trim(),
                  authType: user.provider.trim(),
                  uid: jointValue
                })
                const saveUser = await newUser.save()
                if (saveUser) {
                  res.status(200).json({ success: true, message: "User registered." })
                }

              }


            }

          }
        )(req, res);
      } catch (err) {
        console.log(err.message);
      }
    },

    //office 365 azure oAuth2.0
    async office365Auth(req, res) {
      try {
        passport.authenticate('azuread-openidconnect', { failureRedirect: '/api/auth/error' })(req, res, next)

      }
      catch (err) {

      }
    },
    //office 365 azure callback
    async office365AuthCallback(req, res) {
      try {
        passport.authenticate('azuread-openidconnect', { failureRedirect: "/api/auth/error" }, async (err, user) => {
          if (err) {
            res.redirect('/api/auth/error')
          }
          if (!user) {
            res.redirect('/api/auth/error')
          }
          console.log(user);
          req.logIn(user, function (err) {
            if (err) {
              res.redirect('/api/auth/error')
            }
            else {

              res.status(200).json({ success: true, message: "User authenticated" })
            }
          })
        })
        //might need to add (req,res) to the end
      }
      catch (err) {

      }
    },

    //auth failed
    async authFail(req, res) {
      try {
        res.status(401).json({ success: false, message: "Authentication failed" });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message })
      }
    },
  };
}

module.exports = authController;