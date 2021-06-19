const mongoose = require('mongoose')

var ContentList = new mongoose.Schema({
    topic_id:       {type:String, required:true},
    chapter_id:     {type:String, required:true},
    contentList:    {type:[Object], required:true,default:[]},
    createdAt :     {type:Date, required:true,default:Date.now()}  
});

module.exports= mongoose.model('contentlists',ContentList);