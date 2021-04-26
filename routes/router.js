const express = require('express')
const router = express.Router()
const Question = require("../controllers/question")
 
router.post("/addquestion",Question.addQuestion);
router.get("/getquestion/:id",Question.getQuestionByTestId);



router.get('/v1',(req,res)=>{
    return res.status(200).json({
        "app-name":"Myaimate-Assessment-Server",
        "version":"0.0.1",
        "description":"Server for myaimate assessment",
        "createdAt":new Date(2021, 04, 21, 00, 20)
    })
});
 

module.exports= router