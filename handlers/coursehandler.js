const Status = require("../models/status-model");
const TopicController = require("../controllers/topicController")
const StatusController = require("../controllers/statusController");
const ChapterController = require("../controllers/chapterController")
const Topic = require("../models/Topics-Model")

exports.courseHandlers=async(req,res)=>{
        const {userid}=req.headers;
        Status.find({ _id: userid}).then( async (data)=>{
            const {topics_unlocked  } = data[0];
            
            await TopicController.fetchTopics(topics_unlocked).then((topics)=>{
 
                return res.status(200).json({
                    success:true,
                    message:topics
                })
            }).catch(err=>{
                return res.status(404).json({
                    message:err
                })
            })
            
           
        }).catch(err=>{
            return res.status(401).json({
                success:false,
                Error:err,
                message:"UnAuthorized User"
            })
        })
      
}

exports.fetchCourseByClass=async(req,res)=>{
    const {user_id,Class}=req.body;
    await Topic.find({ class: Class}).then( async (topics_data)=>{
        await TopicController.fetchTopics(user_id,topics_data).then((topics)=>{
            return res.status(200).json({
                success:true,
                message:topics
            })
        }).catch(err=>{
            return res.status(404).json({
                message:err
            })
        })
    }).catch(err=>{
        return res.status(401).json({
            success:false,
            Error:err,
            message:"UnAuthorized User"
        })
    })
  
}


exports.fetchUserCourses=async(req,res)=>{
    const body=req.body;
    var topic_unlocked=null;
    var chapter_unlocked=null;
    var topicsRes=[];

    await StatusController.fetchStatus(body.user_id).then(async status=>{
        topic_unlocked = status[0].topic_unlocked;
        chapter_unlocked = status[0].chapter_unlocked;
       

    }).catch(err=>{
        res.status(404).json({
            message:"Unable to Fetch User Data",
            Error:err
        })
    })
    await TopicController.fetchTopicsByClass(body.class).then(async(topics)=>{
        if(topics.length >0){
            
            for(let topic in topics){
                var topicObj=null;
                var tp_id=topics[topic]._id;
                var TP_ID=`topicID$${tp_id}`;
                
                if(topic_unlocked[TP_ID] && topic_unlocked[TP_ID].status ==="UNLOCKED"){
                    topicObj={...topics[topic]._doc,...topic_unlocked[TP_ID]}
                   // console.log(topicObj)
                }else{
                    topicObj={...topics[topic]._doc,status:"LOCKED"}
                   // console.log(topicObj)

                }
                
                var Chap_List=[];
                await ChapterController.fetchChaptersByTopicId(topics[topic]._id).then((chapters)=>{
                      

                    for (let chap in chapters){
                            var ch_id=chapters[chap]._id;
                            var CH_ID=`chapterID$${ch_id}`;
                            
                            if( chapter_unlocked[CH_ID] &&  chapter_unlocked[CH_ID].status ==="UNLOCKED"){
                                Chap_List.push({...chapters[chap]._doc,...chapter_unlocked[CH_ID]})
                              //  console.log(CH_ID,"is Unlocked")
                            }else{
                                Chap_List.push({...chapters[chap]._doc,status:"LOCKED"})
                              //  console.log(CH_ID,"is Locked")
                            }
                        }     
                })

                topicsRes.push({...topicObj,chapter_list:Chap_List})
            }
            res.status(200).json({
                status:true,
                message:"Fetch Successfull",
                data:topicsRes
            })
        }else{
            res.status(404).json({
                Error:"No_Topic_Found",
                message:"Topics Not available"
            })  
        }

    }).catch(err=>{
        res.status(403).json({
            Error:err,
            message:"Failed to fetch Topics"
        })
    })

     

    
    
    

    

}