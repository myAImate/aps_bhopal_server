const mongoose = require('mongoose')

var Chapter = new mongoose.Schema({
    topic_id:{type:String,required:true},
    title:          {type:String, required:true},
    description:    {type:String, required:true},
    readingTime:    {type:String, required:true,default:"5 mins"},
    createdAt :     {type:Date, required:true,default:Date.now()}  
});

module.exports= mongoose.model('chapters',Chapter);