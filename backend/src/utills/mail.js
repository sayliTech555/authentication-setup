exports.generateOtp=()=>{
    let otp=""
    for(let i=0;i<=3;i++){
        let randomNumber=Math.round(Math.random()*9)
        otp+=randomNumber
    }
    return otp
}