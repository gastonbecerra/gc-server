require('dotenv').config()
var express = require('express');
var app = express();

//DATABASE MONGOOSE
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('CONECTED TO MONGO ATLAS'))
.catch(err => console.log(err))

// EXPRESS SERVER CONFIGURATION
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ROUTES
var moduleRoutes = require('./routes/modulesRoutes');
var indicatorRouter = require('./routes/indicatorsRoutes');
var contextRouter = require('./routes/contextRoutes');

app.use('/modules', moduleRoutes);
app.use('/indicators', indicatorRouter);
app.use('/contexts', contextRouter);


app.listen(process.env.PORT, () =>
    console.log('Servidor escuchando en http://localhost:8080')
).on("error", (err) => {
    console.log("error", err);
});