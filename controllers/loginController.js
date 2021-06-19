exports.loginUser=(req,res)=>{
    const {userName,password} = req.body;
    console.log();
            
    if(
        userName==="admin@myaimate.com" &&
        password==="admin@123"
        ){
            res.status(200).json({
                message:"Authentication Done"
            })
        }
    else{
        res.status(403).json({
            message:"Authentication Failed !!! Access Forbidden"
        })
    }    
    
} 
