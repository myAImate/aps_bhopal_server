const mongoose = require('mongoose')

var question = new mongoose.Schema({
    testId:     {type:String,required:true},
    ques:       {type:String,required:true},
    option_a:   {type:String, required:true},
    option_b:   {type:String, required:true},
    option_c:   {type:String, required:true},
    option_d:   {type:String, required:true, },
    createdAt : {type:Date, required:true,default:Date.now()}  
});

module.exports= mongoose.model('questions',question);