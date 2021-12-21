var Sample = require('../models/Samples');

class SampleController {

    async getSampleByContextAndIndicator(indicator, context){
        var response = await Sample.find({
            $and: [
                {indicator: indicator},
                {context: context}
            ]
        })
        if(response.length === 0){
            return {error: "error reading context db"}
        }else{
            return response;
        }     
    }
}

module.exports = SampleController;