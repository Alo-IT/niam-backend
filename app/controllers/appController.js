const App = require("../models/adminEnd/app")


function appController() {
    return {
        //get all apps
        async getAllApps(req, res) {
            try {
                const apps = await App.find({})
                res.status(200).json({ success: true, message: "Apps found", data: apps })
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message })
            }
        },

        //add new app
        async addApp(req, res) {
            try {
                // await App.deleteMany()
                const newApps = req.body.map((appData) => new App(appData))
                // const newApp = new App(req.body)
                const savedApp = await Promise.all(newApps.map(app => app.save()));

                res.status(200).json({ success: true, message: "App saved", data: "Saved" })
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message })
            }
        },
        //get app by id
        async getAppById(req, res) {
            try {
                const app = await App.findById(req.params.id)
                app ? res.status(200).json({ success: true, message: "App found" })
                    :
                    res.status(400).json({ success: false, message: "App not found" })
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message });
            }
        },
        // update app
        async updateApp(req, res) {
            try {
                const reqBody = req.body
                const editedApp = await App.findByIdAndUpdate(req.params.id, reqBody)
                editedApp ? res.status(200).json({ success: true, message: "App updated" })
                    :
                    res.status(400).json({ success: false, message: "App not updated" })
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message })
            }
        },
        // delete app
        async deleteApp(req, res) {
            try {
                const deleteApp = await App.findByIdAndDelete(req.params.id)
                deleteApp ? res.status(200).json({ success: true, message: "App deleted" })
                    :
                    res.status(400).json({ success: false, message: "App not deleted" })
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message })
            }
        },
    }
}

module.exports = appController