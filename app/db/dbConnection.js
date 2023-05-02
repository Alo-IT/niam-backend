const mongoose = require('mongoose');

const connection = async (dbName) => {
    const dbString = process.env.Mongoose_New_Db + '/' + dbName;
    console.log(dbString);
    const conn = await mongoose.createConnection(dbString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return conn
}
module.exports = connection;