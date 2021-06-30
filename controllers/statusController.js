const Status = require("./../models/status-model")

exports.createStatus=(req,res)=>{
    const body=req.body;
     
    let status= new Status(body);
    status.save()
        .then(()=>{
            return res.status(200)
            .json({
                success:true,
                message:"status Created",
                id:status._id
            }) 
        })
        .catch(err=>{
            return res.status(401)
            .json({
                success:false,
                message:err
            })        
        })
    
} 

 
exports.fetchStatus=(user_id)=>{
    return new Promise(async(resolve,reject)=>{
        await Status.find({user_id:user_id}).then((status)=>{
            resolve(status);
        }).catch(err=>{
            reject({
                message:"DB_ERROR",
                Error:err
            })
        })
    })
} 
