const Question = require("../models/question-model")
const Answer =require("../models/answer-model")

exports.addQuestion=(req,res)=>{

    let {
        ques,
        testId,
        option_a,
        option_b,
        option_c,
        option_d,
        answer
    }=req.body

    if(
        ques &&
        testId && 
        option_a && 
        option_b && 
        option_c &&
        option_d &&
        answer){
            let payload = {
                ques:ques,
                testId:testId,
                option_a:option_a,
                option_b:option_b,
                option_c:option_c,
                option_d:option_d,
                
            }

            const question = new Question(payload);
            if (!question) {
                return res.status(210).json({ message:"failed while adding question",success: false, error: err })
            }
            const ans = new Answer({quesId:question._id,answer:answer });
            if (!ans) {
                return res.status(210).json({message:"failed while adding answer",  success: false, error: err })
            }
            question.save()
                ans.save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        question_id: question._id,
                        answer_id:ans._id,
                        message: 'Question Object created Answer!',
                    })
                })
                .catch(error => {
                    return res.status(211).json({
                        error,
                        message: 'Question Object not created!',
                    })
                })

        }else{
            return res.status(400).json({
                message:"Request Failed, provide complete body !!!"
            })
        }

    
}


exports.getQuestionByTestId=(req,res)=>{
    let id=req.params.id
    
    Question.find({testId:id}).then((questions)=>{
        if(questions.length==0){
           return  res.status(404).json({
                success:false,
                message:"Sorry, No questions found for this id :"+id,
                
            })
        }else{
            return res.status(200).json({
                    success:true,
                    data:questions,
                    length:questions.length
                })
            
        }
        
    })

 
}