const Topic = require("./../models/Topics-Model")
const ChapterList = require("../models/ContentList-Model")
const Status = require("./../models/status-model")


exports.createTopic=(req,res)=>{
    const body=req.body;
     
    let topic= new Topic(body);
    topic.save()
        .then(()=>{
            return res.status(200)
            .json({
                success:true,
                message:"Topic Created",
                id:topic._id
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

exports.fetchTopics=(user_id,topics_id)=>{
    
    return new Promise(async (resolve,reject)=>{
        var topics=[];
        for( var topic in topics_id){
            await Topic.findById(topics_id[topic]._id || topics_id[topic].topic_id).then(async data=>{
                let chap_list={};
                let topic_status={};
                await ChapterList.find({topic_id:data._id}).then((list)=>{
                    chap_list=list[0].lines;
                       
                }).catch(err=>{
                    reject(err);
                })
                await Status.find({user_id:user_id,topic_id:data._id}).then((status)=>{
                    topic_status=status[0];
                    
                }).catch(err=>{
                    reject(err);
                })
                topics.push({...data._doc,lines:chap_list,topic_status:topic_status.topic_status,total_chapters:chap_list.length,chapters_completed:topic_status.chapters_completed})

            }).catch(err=>{
                console.log("Error in fetching : "+topics_id[topic]._id)
                reject(err);
            })
        }
        resolve(topics); 
    }).catch(err=>{
        reject(err);
    })
      
 } 

 exports.fetchTopicsByClass=(Class)=>{
    
    return new Promise(async (resolve,reject)=>{
         
        await Topic.find({class:Class}).then((topics)=>{
            resolve(topics); 
        }).catch(err=>{
            reject(err);
        })
        
    }).catch(err=>{
        reject(err);
    })
      
 } 

