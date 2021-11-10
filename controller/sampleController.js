var Sample = require('../database/mongo/sampleModel');

class SampleController{
    
    async getSamples(){
        const samples = await Sample.find({})
        if(samples.length === 0){
            return {eror: "error reading context db"}
        }else{
            return samples;
        }     
    }

    async getByIndicatorAndContext(id, context){
        const sample = await Sample.find({indicator: id, contexto: context})
            return sample;
        
    }
}

module.exports = SampleController;