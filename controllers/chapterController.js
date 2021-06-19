const Chapter = require("./../models/Chapter-Model")

exports.createChapter=(req,res)=>{
    const body=req.body;
     
    let chapter= new Chapter(body);
    chapter.save()
        .then(()=>{
            return res.status(200)
            .json({
                success:true,
                message:"Chapter Created",
                id:chapter._id
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
exports.createManyChapter=async(req,res)=>{
    const body=req.body;
    var chap_res =[]
    try{
        for ( var chap in body){
            let chapter= new Chapter(body[chap]);
            await chapter.save().then((res_s)=>{
                  chap_res.push({
                      message: `chapter ${chapter._id} created successfully`,
                      id:chapter._id
                  })  
            })
                
        }
    
        return res.status(200).json({
            message:"Chapter Created ",
            data:chap_res
        })
    
    }catch(err){
        return res.status(403).json({
            message:"Request Failed",
            Error:err
        })
    }
        
    
} 


exports.fetchChapters=(chapters_id)=>{
    return new Promise(chapters_id,async (resolve,reject)=>{
        var chapters=[];
        for( var chapter in chapters_id){
            await Chapter.findById(chapter.chapter_id).then(data=>{
                chapters.push(data);
            }).catch(err=>{
                console.log("Error in fetching : "+chapter.chapter_id)
                console.log(err);
            })

        }
        resolve(chapters); 
    }).catch(err=>{
        reject(err);
    })
  
} 

exports.fetchChaptersByTopicId=(topic_id)=>{
    return new Promise(async (resolve,reject)=>{
        await Chapter.find({topic_id:topic_id}).then(chapters=>{
            resolve(chapters);
        }).catch(err=>{
            reject(err);
        })
    })
  
} 
