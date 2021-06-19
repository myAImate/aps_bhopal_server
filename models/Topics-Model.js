const mongoose = require('mongoose')

var Topic = new mongoose.Schema({
    topicID:        {type:String,required:true},
    class:          {type:String,required:true},
    title_line1:    {type:String, required:true},
    title_line2:    {type:String, required:true},
    chaptersList:   {type:String, required:false},
    createdAt :     {type:Date, required:true,default:Date.now()},

});

module.exports= mongoose.model('topics',Topic); 