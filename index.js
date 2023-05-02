const express = require('express');
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser')
const MongoDbStore = require('connect-mongo')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('express-flash')          //must active when using connect-mongo
const passport = require('passport');
require('./app/controllers/authControllers/passport-config');    //passport setup file

/* Creating an instance of express. */
const app = express();

const PORT = process.env.PORT || 4000;

/* Setting the strictQuery to true. */
mongoose.set('strictQuery', true);

/* Connecting to the mongodb database. */
const connection = mongoose.connect(process.env.Mongoose_connect, { useNewUrlParser: true, useUnifiedTopology: true }).then((response) => {
    console.log('MongoDb connected');
});

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: process.env.Mongoose_connect,
        dbName: process.env.Initial_Db
    }),
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 }  //60000ms = 1sec * 60sec = 1hr
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

//session middleware goes here
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/* This is a middleware that is used to handle cross-site requests. manage header issue */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
})

//used to handle cross-site requests
app.use(cors({
    credentials: true,
    origin: ['http://192.168.0.105:3000', 'http://192.168.0.103:3001', 'http://localhost:3000', 'http://localhost:3001'],
    //exposedHeaders:['set-cookie'],
}));

//static file location declared here
app.use(express.static(path.join(__dirname, 'public')));


// global error handler
app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).json({ message: err.message });
})

const server = app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
});
require('./routes/api')(app)