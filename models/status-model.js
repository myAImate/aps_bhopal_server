const mongoose = require('mongoose')

var Status = new mongoose.Schema({
    user_id:            {type:String,required:true},
    topic_unlocked:     {type:Object,required:true,default:[]},
    chapter_unlocked:   {type:Object,required:true,defaultStatus:[]},
    createdAt :         {type:Date, required:true,default:Date.now()}  
});

module.exports= mongoose.model('status',Status);