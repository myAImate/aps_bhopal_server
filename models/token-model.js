const mongoose = require('mongoose')

var Token = new mongoose.Schema({

    user_id:    {type:String,required:true},
    createdAt : {type:Date, required:true,default:Date.now()},

});

module.exports= mongoose.model('tokens',Token); 