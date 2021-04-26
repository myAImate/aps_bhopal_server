const mongoose = require('mongoose')

var answer = new mongoose.Schema({
     
    quesId:     {type:String,required:true},
    answer:     {type:String, required:true},
    createdAt : {type:Date, required:true,default:Date.now()}  
});

module.exports= mongoose.model('answers',answer);