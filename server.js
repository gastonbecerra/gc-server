//------------------ EXPRESS app variables------------------//
require('dotenv').config()
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
var cors = require('cors');
var cookieParser = require('cookie-parser');

//------------------------------------------Middleware configuration------------------------------------------//
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

//------------------------------------------DATABASE MONGOOSE--------------------------------------------//
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL, 
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(()=> console.log('CONECTED TO MONGO ATLAS'))
    .catch(err => console.log(err))

//-------------------------------------------------------SESSION CONFIGURATION----------------------------------------------//
app.use(session({
  secret:'shhh',
  resave:true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000 // => this affects the time user data lives on server in miliseconds
  }
}))


//-------------------------------------EXPRESS SERVER CONFIGURATION----------------------------------------------------------//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(cookieParser('shhh'))

//----------------------------------------------------------PASSPORT-----------------------------------------------------//
const passport = require('passport');
app.use(passport.initialize())
app.use(passport.session());
require('./controller/passportConfig')(passport);

//--------------------------------------------------------------ROUTES---------------------------------------------------------//
const inputRouter = require('./routes/inputRoutes');
const userRoutes = require('./routes/userRoutes');
const moduleRoutes = require('./routes/modulesRoutes');
const contextRoutes = require('./routes/contextRoutes');

app.use('/', userRoutes);
app.use('/inputs', inputRouter);
app.use('/modules', moduleRoutes);
app.use('/contexts', contextRoutes);


//---------------------------------------------------SERVER---------------------------------------------------//
app.listen(process.env.PORT, () =>
    console.log('Servidor escuchando en http://localhost:8080')
).on("error", (err) => {
    console.log("error", err);
});