var express = require('express');
var valueRouter = express.Router();
var Var = require('../models/Vars');
var Value = require('../models/Values');
var request = require('request');
var Axios = require('axios')
// GETA ALL VALUES

valueRouter.get('/', async (req, res) => {
  res.json(await Value.find({}))
})


// GET ALL VALUES BY USER 

valueRouter.get('/:user_id', async (req, res)=>{
  var response = await Value.find({user: req.params.user_id})
  res.send(response);
})


// UPDATE INPUT

valueRouter.put('/:id', (req, res, next) => {    
  Value.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(true)
    }
  })
})

// POST NEW INPUT

valueRouter.post('/', async (req, res)=>{

  const newInput = new Value({
      user: req.body.user, 
      value: req.body.value, 
      timestamp: req.body.timestamp,
      var: req.body.var
  })
  
  newInput.save()
  .then((data)=>{
    res.send(true)
  })
  .catch((error)=>{
    res.send(false)
  })
  
  // fetch(`https://stormy-citadel-88496.herokuapp.com/calculate/indicador-usuario?usuario=${user}&indicador=${indicator}`)
  // .then(res => 
  //     res.json())
  // .then(json => {
  //     res.send({status: true, msge: "user-indicator-created"})
  // })
  // .catch((err)=>{
  //     res.send({status: false, msge: "error-in-user-indicator-created"})
  // })
})

//DELETE INPUT
// inputRouter.delete('/:id', function (req, res) {
//     var id = req.params.id;
  
//     Input.deleteOne({ _id: id })
//     .then((data)=>{
//         res.json({msge: 'deleted', data})
//     })
//   });

// GENERATE NEW USER VALUE
valueRouter.post('/user_value', async (req,res)=> {
  var {user, indicator} = req.body;
  // Axios({
  //   method: 'GET',
  //   withCredentials: true,
  //   url: `https://stormy-citadel-88496.herokuapp.com/calculate/user-value?indicator=${indicator}&user=${user}`
  // })
  //   .then(json => {
  //     console.log(86, json);
  //       res.json({json});
  //   })
  var data = await Axios.get(`https://stormy-citadel-88496.herokuapp.com/calculate/user-value?indicator=${indicator}&user=${user}`)
  console.log(data.data);
  res.send(data.data)
});

  // fetch(`https://stormy-citadel-88496.herokuapp.com/calculate/indicador-usuario?usuario=${user}&indicador=${indicator}`)
    // .then(res => 
    //     res.json())
    // .then(json => {
    //     res.send(json)
    // })
    // .catch((err)=>{
    //     res.send({status: false, msge: "error-in-user-indicator-created"})
    // })
// })

module.exports = valueRouter;