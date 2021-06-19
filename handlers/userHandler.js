const UserCtrl = require("../controllers/userController")
const TopicCtrl = require("../controllers/topicController")
const ChapterListCtrl= require("../controllers/contentListController")
const chapterListModel = require("../models/ContentList-Model")


const ChapterInitialState={
    chapter_status:"UNLOCKED",
    completed:false,
    completionDate:0,
    unlockedAt:null,
    unlockedBy:null,
    chapter_id:null
}

exports.createUser =async(req,res) => {

    // create User Account is User Table  === Status Done 
    
    await UserCtrl.createUser(req,res).then(async data=>{
        console.log(data)
         /*  Add List  with UserID, and Its Topics in 
        status Table for tracking progress of each Topic  
        */
        await TopicCtrl.fetchTopicsByClass(req.body.class).then(async topics=>{
            if(topics.length > 0){
                console.log(topics)
                for(let topic in topics){
                    await ChapterListCtrl.fetchChapterListByTopicID(topics[topic]._id).then((chapterList)=>{
                        var  chap_list = chapterList[0].lines;
                        
                         
                    })
                }
            }else{
                return res.status(505).json({
                    success:false,
                    message:"User Creation Failed. Server Error"
                })
            }
            
            
        })

        
        // Create User Profiles
        return res.status(200).json({
            success:true,
            message:"User Created",
            id:data.user_id
        })
    }).catch(err=>{
        console.log(err.errorCode);
        if(err.errorCode ==="USER_EXISTS"){
            return res.status(400).json({
                success:false,
                message:"Request Failed",
                Error:err
            })
        }else{
            return res.status(500).json({
                success:false,
                message:"Internal Server Error",
                Error:err
            })
        }
        
       
    })

   
    /*  
        Create Profile Make in Profile Table 
    */     
    
        
}