const mongoose = require('mongoose')

var User = new mongoose.Schema({
    firstName:  {type:String,required:true},
    lastName:   {type:String,required:true},
    user_id:    {type:String,required:true},
    class:      {type:String,required:true},
    password:    {type:String,required:true},
    createdAt : {type:Date, required:true,default:Date.now()},

});

module.exports= mongoose.model('users',User); 