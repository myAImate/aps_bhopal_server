var Token = require("../models/token-model")
var User= require("../models/user-model")

exports.resolveToken=async(req,res,next)=>{
    if(!req.headers["x-auth-token"]){
         
        return res.status(403).json({
            success:false,
            message:"Token is Missing. Please Login Again"
            
        })
    
       
    }
    await Token.find({token:req.headers["x-auth-token"]}).then(async (token_res)=>{
        req.body.user_id = token_res[0].user_id 
        await User.findById({_id:token_res[0].user_id}).then( user =>{
            if(!!user){
                req.body.class = user.class 
                next();
            }else{
                return res.status(404).json({
                    success:false,
                    message:"User Not Found. Please Login Again"
                    
                })     
            }
            
        }).catch(err=>{
            return res.status(404).json({
                success:false,
                message:"User Not Found. Please Login Again"
                
            })
        })
      
    }).catch(err=>{
        return res.status(403).json({
            success:false,
            message:"Token Expired. Please Login Again"
            
        })
    })
}



exports.verifyToken=async (req,res)=>{
    if(!req.headers['x-auth-token']){
        return res.status(403).json({
            success:false,
            message:"Token is Missing. Please Login Again"
            
        })
    }
    await Token.find({token:req.headers['x-auth-token']}).then(async token_res=>{

        if(token_res.length == 0){

            return res.status(403).json({
                success:false,
                message:"Forbidden, Token doesn't exists"
            })
        }
        await User.findById({_id:token_res[0].user_id}).then( user =>{
            if(!!user){
              
                let res_data={
                    firstName:user.firstName,
                    lastName :user.lastName,
                    user_id:user.user_id,
                    class:user.class
                }

                return res.status(200).json({
                    success:true,
                    data: res_data
                }) 
                
            }else{
                return res.status(404).json({
                    success:false,
                    message:"User Not Found. Please Login Again"
                    
                })     
            }
            
        }).catch(err=>{
            return res.status(404).json({
                success:false,
                message:"User Not Found. Please Login Again"
                
            })
        })
       
        return res.status(403).json({
            success:false,
            message:"Forbidden",
            Error:err
        })
    }).catch(err=>{
        return res.status(403).json({
            success:false,
            message:"Forbidden",
            Error:err
        })
    })
}