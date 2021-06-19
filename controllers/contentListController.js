const ContentList = require("../models/ContentList-Model")

exports.createContentList=(req,res)=>{
    const body=req.body;
     
    let contentList= new ContentList(body);
    contentList.save()
        .then(()=>{
            return res.status(200)
            .json({
                success:true,
                message:"Content List Created",
                id:contentList._id
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

exports.fetchContentList=async(req,res)=>{
    
    const id = req.params.id;
   
    await ContentList.find({_id:id}).then((contentList)=>{
        
        return res.status(200)
        .json({
            success:true,
            message:"Content fetch Successful",
            data:contentList 
        }) 
    }).catch(err=>{
        
        return res.status(403)
        .json({
            message:"Database Error",
            Error:err,
            errorCode:"DB_ERROR"
        })
    })
   
}