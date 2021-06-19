const Topic = require("../models/Topics-Model")
const ChapterList = require("../models/chapterList-Model")
exports.AddTopicsForNewUser =async(Class,user_id) => {
    
    Topic.find({class:Class}).then((topics)=>{
        for (let topic in topics ){
            ChapterList.find({topic_id:topics[topic]._id}).then((chap_lists)=>{
                console.log(topics[topic]);
                console.log(chap_lists);
            })
        }
    })

    return res.status(200).json({
        success:true,
        message:"User Created"
    })
}