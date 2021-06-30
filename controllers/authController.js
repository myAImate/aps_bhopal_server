const User = require('../models/user-model')

const Token =require('../models/token-model')

const crypto = require("crypto")


exports.loginPost = function(req, res, next) {
    req.assert('password', 'Password cannot be blank').notEmpty();
    
    var errors = req.validationErrors();
    if (errors) return res.status(505).send(errors);
      
    User.findOne({ user_id: req.body.user_id }, async function(err, user) {
        if(err){
            return res.status(500).json({
                success:false,
                message:"Unable to fetch data from Database"
            })
        }

        if (!user) return res.status(404).send({ msg: 'The User ID ' + req.body.user_id + ' is not associated with any account. Double-check your User ID and try again.'});
        


        var isMatch= user.password === req.body.password ;

        if (!isMatch) return res.status(403).send({ msg: 'Wrong password!!!' });
        var _token=crypto.randomBytes(16).toString('hex')    
        
        let res_data={
            firstName:user.firstName,
            lastName :user.lastName,
            user_id:user.user_id,
            class:user.class
        }

        var token = new Token({ user_id: user._id, token: _token });
        
        token.save().then((tk,err)=>{
            if(err){
                res.status(505).json({
                    message:"Internal Server Error",
                    Error:err
                })
            }
            res.status(200).json({
                status:true,
                token:tk.token,
                data:res_data
                
              });
          
        })
        
    });
};


/**
* POST /signup
*/
exports.signupPost = function(req, res, next) {
  req.assert('firstName', 'First Name cannot be blank').notEmpty();
  req.assert('lastName', 'Last Name cannot be blank').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);

  // Check for validation errors    
  
  var errors = req.validationErrors();
  if (errors) { return res.status(401).send(errors); }

  // Make sure this account doesn't already exist
  User.findOne({ user_id: req.body.user_id }, function (err, user) {
    if(err){
        return res.status(402).json({
            status:false,
            message:"Unable to complete Request. Internal server error "
        })
    }
    if (user) return res.status(403).json(
        { 
            status:"FORBIDDEN",
            msg: 'The User ID you have entered is already associated with another account.' 
        }
    );

    let payload={
        user_id:req.body.user_id,
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        class:req.body.class,
        password:req.body.password,
        
    }  
     
     user = new User(payload);
  
     user.save(function (err) {
         if (err) { 
            return res.status(500).send({ 
                success:false,
                msg: err.message 
            }); 
        }
        
        return res.status(200).json({
            success:true,
            message:"User Created Successfully",
            id:user._id
        })   
 
     });

    })
    
  
    
};


exports.changePassword= async (req,res,next)=>{
    req.assert('oldpassword', 'Password must be at least 4 characters long').len(4);
    req.assert('newpassword', 'Password must be at least 4 characters long').len(4);
    var errors = req.validationErrors();
    if (errors) return res.status(500).send(errors);

    await User.findById(req.body.user_id).then(user=>{
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }  

        if(user.password !== req.body.oldpassword){
            return res.status(403).json({
                success:false,
                message:"Old Password is Wrong"
            })
        }

        user.password = req.body.newpassword;

        user.save().then((user_res)=>{
            console.log(user_res);
            return res.status(200).json({
                status:true,    
                message:"Password Changed"
            })
        }).catch(err=>{
            return res.status(405).json({
                status:true,    
                message:"Error",
                Error:err
            })    
        })
    })
    
    
    
}







