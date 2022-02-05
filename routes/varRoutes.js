var express = require('express');
var varRouter = express.Router();
var Var = require('../models/Vars');
var Values = require('../models/Values');


// GET ALL VARS BY USER 
// - combines info from filled (Values) and unfilled vars from a specific user 
// - set the data needed for "/inputs" tab!

varRouter.get('/:user_id', async (req, res)=>{
    
    // 1) Traemos todas las variables
    
    var vars = await Var.find({});
    
    // 2) traemos todos inputs del usuario    
    
    var values =  await Values.find({user: req.params.user_id})    
    values.length === 0 ? values = false : null;
    
    // 3) Hacemos el cruce de información entre variables vacías y variables llenadas x el usuario
    function transporter(child, parent){
        if(child && parent){
        var matches = [];
        var index = 0;
        var child = child;   
        var parent = parent;
        var childIndex = child.length;
        var holder = []

        try {
            while( matches.length < parent.length){                    
                var flag = parent[index];
                for(var i = 0; i < child.length; i++ ){
                var flag = parent[index];
                
                if(flag.var === child[i].var){                                       
                    !matches.includes(flag.var) 
                        &&  
                        holder.push({
                            processed: true,
                            _id: child[i]._id, 
                            value: child[i].value, 
                            user: child[i].user,
                            timestamp: child[i].timestamp && child[i].timestamp,
                            type:flag.type,
                            validation:flag.validation,
                            ux_input: flag.ux_input,
                            var: flag.var,
                            description: flag.description,
                            measurement: flag.measurement
                        })
                        matches.push(flag.var);
                        index ++;
                        }else{
                            childIndex --;
                        }
                                            
                if(childIndex < -1){
                    !matches.includes(flag.var) &&  
                        holder.push({
                            processed: false,
                            type:flag.type,
                            validation:flag.validation,
                            ux_input: flag.ux_input,
                            var: flag.var,
                            description: flag.description,
                            measurement: flag.measurement
                        })
                    matches.push(flag.var);
                    index ++;
                    childIndex = child.length;
                }
            }
        }  
        return holder;
        
        }catch(error){
            return holder;
        }
        
        }else if(!values){
            return parent;
        }   
    }

    res.json(transporter(values, vars))

})

// GET ALL VARS

varRouter.get('/', async (req, res)=>{
    res.json(await Var.find({}))
})

module.exports = varRouter;

