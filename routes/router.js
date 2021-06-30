const express = require('express')
const router = express.Router()

const Topic = require("../controllers/topicController")
const Chapter = require("../controllers/chapterController")
const Status = require("../controllers/statusController")
const ContentList = require("../controllers/contentListController")
const Authenticate = require("../controllers/authController")
const CourseHandler= require("../handlers/coursehandler")


const auth = require("../auth/auth")


router.post("/add/topic",Topic.createTopic)
router.post("/add/chapter",Chapter.createChapter)
router.post("/addmany/chapter",Chapter.createManyChapter)

router.post("/add/contentlist",ContentList.createContentList)

router.post("/add/status",Status.createStatus)



router.post("/fetch-courses",auth.resolveToken,CourseHandler.fetchUserCourses)
router.get(`/fetch/contentlist/:id`,auth.resolveToken,ContentList.fetchContentList)

router.post("/admin/user",Authenticate.signupPost)
router.post("/user/login",Authenticate.loginPost)
router.get("/user/verify-token",auth.verifyToken)
router.post("/user/change-password",auth.resolveToken,Authenticate.changePassword)


router.get('/v1',(req,res)=>{
    return res.status(200).json({
        "app-name":"Myaimate-APS-Bhopal-Server",
        "version":"0.0.1",
        "description":"Server for APS Bhopal by myAImate",
        "createdAt":new Date(2021, 06, 20, 00, 20)
    })
});
 
module.exports= router
