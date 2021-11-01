var mongoose = require('mongoose')
var indicatorModel = require('../database/mongo/indicatorModel');

class IndicatorController {
    
    // MATCH ROUTE FOR CONTEXT GET ALLS
    async getIndicators() {
        const indicators = await indicatorModel.find({})
        if(indicators.length === 0){
            return {eror: "error reading context db"}
        }else{
            return indicators;
        }     
    };

    // MATCH ROUTE FOR CONTEXT GET BY NAME
    async getIndicatorById(id) {
        const indicators = await indicatorModel.findById({_id: id})
        if(indicators.length === 0){
            return {eror: "error reading context db"}
        }else{
            return indicators;
        }     
    };
}

module.exports = IndicatorController;