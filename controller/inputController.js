var inputModel = require('../database/mongo/inputModel');

class InputController {
    
    // MATCH ROUTE FOR CONTEXT GET ALLS
    async getInput() {
        const inputs = await inputModel.find({})
        if(inputs.length === 0){
            return {eror: "error reading context db"}
        }else{
            return inputs;
        }     
    };
}

module.exports = InputController;