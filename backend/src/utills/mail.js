const nodemailer = require("nodemailer")



exports.generateOtp=()=>{
    let otp=""
    for(let i=0;i<=3;i++){
        let randomNumber=Math.round(Math.random()*9)
        otp+=randomNumber
    }
    return otp
}

exports.mailTransport =()=> nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_TRAP_USERNAME,
      pass: process.env.MAIL_TRAP_PASSWORD
    }
  });