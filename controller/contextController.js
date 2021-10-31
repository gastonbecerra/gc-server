var contextModel = require('../database/mongo/contextModel');

class ContextoController {
    
    // MATCH ROUTE FOR CONTEXT GET ALLS
    async getContexts() {
        const contexts = await contextModel.find({});
        contexts.length === 0 ?  {error: 'no existing contexts'} :  contexts;     
    };
}

module.exports = ContextoController;