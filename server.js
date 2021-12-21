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
const sampleRoutes = require('./routes/sampleRoutes');

app.use('/samples', sampleRoutes);


//---------------------------------------------------SERVER---------------------------------------------------//
app.listen(process.env.PORT, () =>
    console.log('Servidor escuchando en http://localhost:8080')
).on("error", (err) => {
    console.log("error", err);
});