var contextModel = require('../database/mongo/contextModel');

class ContextoController {
    
    // MATCH ROUTE FOR CONTEXT GET ALLS
    async getContexts() {
        const contexts = await contextModel.find({})
        if(contexts.length === 0){
            return {eror: "error reading context db"}
        }else{
            return contexts;
        }     
    };
}

module.exports = ContextoController;