const express = require('express')
const router = express.Router()
const Auth = require("../controllers/loginController")
const Topic = require("../controllers/topicController")
const Chapter = require("../controllers/chapterController")
const Status = require("../controllers/statusController")
const ContentList = require("../controllers/contentListController")

const CourseHandler= require("../handlers/coursehandler")
const UserHandler = require("../handlers/userHandler")

router.post("/login",Auth.loginUser);
router.post("/add/topic",Topic.createTopic)
router.post("/add/chapter",Chapter.createChapter)
router.post("/addmany/chapter",Chapter.createManyChapter)

router.post("/add/contentlist",ContentList.createContentList)

router.post("/add/status",Status.createStatus)



router.post("/fetch-courses",CourseHandler.fetchUserCourses)
router.get(`/fetch/contentlist/:id`,ContentList.fetchContentList)
router.post("/admin/create-user",UserHandler.createUser)



router.get('/v1',(req,res)=>{
    return res.status(200).json({
        "app-name":"Myaimate-Dashboard-Server",
        "version":"0.0.1",
        "description":"Server for myaimate dashboard",
        "createdAt":new Date(2021, 04, 21, 00, 20)
    })
});
 
module.exports= router
