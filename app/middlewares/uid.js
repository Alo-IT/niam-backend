const crypto = require('crypto');

/**
 * It generates a random string of 4 hexadecimal characters, converts it to uppercase, and returns it as a 8 character UID
 */
function generateUniqueId() {
  const id = crypto.randomBytes(4).toString('hex');
  return id.toUpperCase();
}



/*** It generates a unique id and sends it to next route if not empty ,else it will terminate request */
const uidGenerator = (req,res,next)=>{
    
    let uid = generateUniqueId();
    let jointValue = req.body.firstName.concat('_', uid);
    // jointValue = req.body.organization.concat('_',jointValue)
    req.uid = jointValue
    console.log(jointValue);
    if(uid !="") {
        next()
    }

}

module.exports = uidGenerator;
