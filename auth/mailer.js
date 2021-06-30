const nodemailer = require("nodemailer")

exports.sendEmail =  async ({email,message})=>{
    return new Promise((resolve,reject)=>{
        try{
            var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'noreply.myaimate@gmail.com', pass: 'myaimate' } });
            var mailOptions = { 
                from: 'noreply.myaimate@gmail.com', 
                to: email, 
                subject: 'Account Verification Token', 
                text: message 
            };
            var res = await transporter.sendMail(mailOptions);
            console.log(res)
            resolve({
                message:"Mail send successfully to "+email
            })
        }catch(err){
            reject({

                message:"Failed to send Mail to"+email
            })
        }
        


    })
}




