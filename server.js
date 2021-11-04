// EXPRESS app variables
require('dotenv').config()
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var userModel = require('./database/mongo/userModel')
//Middleware configuration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));


//DATABASE MONGOOSE
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo');

mongoose.connect(process.env.MONGOURL, 
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(()=> console.log('CONECTED TO MONGO ATLAS'))
    .catch(err => console.log(err))

// SESSION CONFIGUATION
app.use(session({
  secret:'shhh',
  resave:true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000 // => this affects the time user data lives on server in miliseconds
  }
}))


// EXPRESS SERVER CONFIGURATION
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(cookieParser('shhh'))

//---------------- PASSPORT ----------------
const passport = require('passport');
app.use(passport.initialize())
app.use(passport.session());
require('./controller/passportConfig')(passport);

//-------------------------------- ROUTES --------------------------------//
var moduleRoutes = require('./routes/modulesRoutes');
var indicatorRouter = require('./routes/indicatorsRoutes');
var contextRouter = require('./routes/contextRoutes');

app.use('/modules', moduleRoutes);
app.use('/indicators', indicatorRouter);
app.use('/contexts', contextRouter);

var bcrypt = require('bcrypt');

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("wrong-data");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("user-authenticated");
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  userModel.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("user-already-registered");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new userModel({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("user-registered");
    }
  });
});

app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});


app.listen(process.env.PORT, () =>
    console.log('Servidor escuchando en http://localhost:8080')
).on("error", (err) => {
    console.log("error", err);
});