const organizationRoute = require('./organizationRoute/organizationRoute')
const adminRoute = require('./adminRoute/adminRoute')
const roleRoute = require('./roleRoute/roleRoute')
const authRoute = require('./authRoute/authRoute')
const appRoute = require("./appRoute/appRoute")
const userRoute = require('./userRoute/userRoute')
const niamAdminRoute = require('./adminRoute/niamAdminRoute') 

function initRoutes(app){
    app.use('/api/niamadmin',niamAdminRoute)
    app.use('/api/organization', organizationRoute)
    app.use('/api/app',appRoute)
    app.use('/api/admin', adminRoute)
    app.use('/api/role', roleRoute)
    app.use('/api/auth', authRoute)
    app.use('/api/user', userRoute)
    
}

module.exports = initRoutes