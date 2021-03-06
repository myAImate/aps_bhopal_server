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

    await StatusController.fetchStatus(body.user_id).then(async (status)=>{
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
                    //console.log(topicObj)
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

exports.forceFetchUserCourses=async(req,res)=>{
    
    var topic_unlocked={
        "topicID$60cedf467c1a04fc8e0f05ae": {
            "status": "UNLOCKED",
            "unlockedBy": "admin",
            "unlockedAt": "01/06/2021"
        },
        "topicID$60cee0037c1a04fc8e0f05af": {
            "status": "UNLOCKED",
            "unlockedBy": "admin",
            "unlockedAt": "01/06/2021"
        },
        "topicID$60cee0217c1a04fc8e0f05b0": {
            "status": "UNLOCKED",
            "unlockedBy": "admin",
            "unlockedAt": "01/01/2022"
        }, 
        "topicID$60cee04c7c1a04fc8e0f05b1": {
            "status": "UNLOCKED",
            "unlockedBy": "admin",
            "unlockedAt": "01/06/2021"
        },
        "topicID$60cee05a7c1a04fc8e0f05b2": {
            "status": "UNLOCKED",
            "unlockedBy": "admin",
            "unlockedAt": "01/01/2022"
        }
    }
     
    var chapter_unlocked= {
        "chapterID$60cee812d1184819c6c66911": {
            "status": "UNLOCKED",
            "unlockedBy": "admin",
            "unlockedAt": "01/06/2021"
        },
        "chapterID$60cee812d1184819c6c66912": {
            "status": "UNLOCKED",
            "unlockedBy": "admin",
            "unlockedAt": "01/06/2021"
        },
        "chapterID$60cee813d1184819c6c66913": {
            "status": "UNLOCKED",
            "unlockedBy": "admin",
            "unlockedAt": "01/06/2021"
        },
        "chapterID$60cee813d1184819c6c66914": {
            "status": "UNLOCKED",
            "unlockedBy": "admin",
            "unlockedAt": "01/06/2021"
        },
        "chapterID$60cee813d1184819c6c6691a": {
            "status": "UNLOCKED",
            "unlockedBy": "admin",
            "unlockedAt": "01/06/2021"
        },
        "chapterID$60cee813d1184819c6c66918": {
            "status": "UNLOCKED",
            "unlockedBy": "admin",
            "unlockedAt": "01/06/2021"
        },
        "chapterID$60cee814d1184819c6c6691d": {
            "status": "UNLOCKED",
            "unlockedBy": "admin",
            "unlockedAt": "01/06/2021"
        },
        "chapterID$60cee813d1184819c6c6691c": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee813d1184819c6c6691b": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee813d1184819c6c66916": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee813d1184819c6c66915": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee813d1184819c6c66919": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee814d1184819c6c6691e": {
            "status": "UNLOCKED"
        },

        "chapterID$60cee814d1184819c6c6691f": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee814d1184819c6c66920": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee814d1184819c6c66921": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee814d1184819c6c66922": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee814d1184819c6c66923": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee814d1184819c6c66924": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee814d1184819c6c66925": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee814d1184819c6c66926": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee815d1184819c6c66927": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee815d1184819c6c66928": {
            "status": "UNLOCKED"
        },


        "chapterID$61d1e6440b9b1a5290c63120": {
            "status": "UNLOCKED"
        },
        "chapterID$61d1e6440b9b1a5290c63121": {
            "status": "UNLOCKED"
        },
        "chapterID$61d1e6440b9b1a5290c63122": {
            "status": "UNLOCKED"
        },
        "chapterID$61d1e6440b9b1a5290c63123": {
            "status": "UNLOCKED"
        },
        "chapterID$61d1e6440b9b1a5290c63124": {
            "status": "UNLOCKED"
        },
        "chapterID$61d1e6440b9b1a5290c63125": {
            "status": "UNLOCKED"
        },
            
        "chapterID$60cee815d1184819c6c66930": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee815d1184819c6c66931": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee816d1184819c6c66932": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee816d1184819c6c66933": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee816d1184819c6c66934": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee816d1184819c6c66935": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee816d1184819c6c66936": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee816d1184819c6c66937": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee816d1184819c6c66938": {
            "status": "UNLOCKED"
        },
        "chapterID$60cee816d1184819c6c66939": {
            "status": "UNLOCKED"
        }


    } 
    
    var topicsRes=[];
 
    await TopicController.fetchTopicsByClass("NINETH").then(async(topics)=>{
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
                   //  console.log(topicObj)

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
                             // console.log(CH_ID,"is Locked")
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
