const User = require("../models/user-model")
 
exports.createUser =async(req,res) => {
    return new Promise(async(resolve,reject)=>{
        const userData= req.body;
        await User.find({user_id:userData.user_id}).then(data=>{
            
            if(data.length==0){
                
                const user = new User(userData)
            
                user.save().then(()=>{
                    resolve( {
                         
                        message:"User Created SuccessFully",
                        user_id:user._id
        
                    })
                }).catch(err=>{
                    reject({
                        message:"Database Error",
                        Error:err,
                        errorCode:"DB_ERROR"
                    })
                }) 
            }else{
                 
                reject({
                    message:"User Already Available",
                    errorCode:"USER_EXISTS"
                })
    
            }
                        

        }).catch(err=>{
             
            reject( {
                message:"Database Error",
                Error:err,
                errorCode:"DB_ERROR"
            })   
        }
        )
        
    }) 
}