var moduleModel = require('../database/mongo/moduleModel');

class ModuleController {
    
    // MATCH ROUTE FOR CONTEXT GET ALLS
    async getModules() {
        const modules = await moduleModel.findOne({})
        if(modules.length === 0){
            return {eror: "error reading context db"}
        }else{
            return modules;
        }     
    };
}

module.exports = ModuleController;