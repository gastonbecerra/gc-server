//------------------ EXPRESS app variables------------------//
require('dotenv').config()
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mongoose = require('mongoose');

//-------------------------------------EXPRESS SERVER CONFIGURATION----------------------------------------------------------//
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('cookie-parser')());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(cookieParser('shhh'))

//------------------------------------------DATABASE MONGOOSE--------------------------------------------//
mongoose.connect(process.env.MONGOURL, 
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(()=> console.log('CONECTED TO MONGO ATLAS'))
    .catch(err => console.log(err, 'ERROR'))


//--------------------------------------------------------------ROUTES---------------------------------------------------------//
const sampleRoutes = require('./routes/samplesRoutes');
const contextRoutes = require('./routes/contextsRoutes');
const modulesRoutes = require('./routes/modulesRoutes');
const indicatorRoutes = require('./routes/indicatorsRoutes');
const varRouter = require('./routes/varRoutes');
const inputRouter = require('./routes/inputRoutes');

app.use('/samples', sampleRoutes);
app.use('/contexts', contextRoutes);
app.use('/modules', modulesRoutes);
app.use('/indicators', indicatorRoutes);
app.use('/vars', varRouter);
app.use('/inputs', inputRouter); // redunda con var. lo duplico para que sea mas limpio nomas

//---------------------------------------------------SERVER---------------------------------------------------//
app.listen(process.env.PORT, () =>
    console.log('Servidor escuchando en http://localhost:8080')
).on("error", (err) => {
    console.log("error", err);
});