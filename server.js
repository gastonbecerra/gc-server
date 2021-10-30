var express = require('express');
var app = express();
var router = express.Router();


app.use(express.urlencoded({extended: true}))


const modules = [
    {"title": "title 1"}
]


app.get('/api/modulos', function(req,res){
    res.send(["Vida Finaciera", "Sex-appeal", "Modulo 3"])
})


app.get('/api/indicadores', function(req,res){
    res.send(["Ahorro", "Satisfacción Laboral", "Indicador 3"])
})

app.listen(8080)
