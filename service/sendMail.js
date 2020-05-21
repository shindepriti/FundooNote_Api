const nodeMailer = require("nodemailer")

exports.sendEmail = (url) =>{
    const transporter = nodeMailer.createTransport({
        service:'Gmail',
        auth:{
            user : process.env.email,
            pass : process.env.password
        }
    });
    var mailOptions = {
        from : process.env.email,
        to : process.env.email,
        subject : "Fundoo Note Password reset link",
        text : "You Requested For Password Reset,kindly Use Link : "+url+ "\n\n\nThank you.\nFundooNote"
    };

    transporter.sendMail(mailOptions,(err,info) =>{
        if(err){
            console.log(err)
        }else{
            console.log("Email Sent",info)
        }
    })
}