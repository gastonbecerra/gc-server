var express = require('express');
var app = express();

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


app.listen(8080, () =>
    console.log('Servidor escuchando en http://localhost:8080')
).on("error", (err) => {
    console.log("error", err);
});