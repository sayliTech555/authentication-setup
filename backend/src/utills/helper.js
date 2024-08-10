const crypto = require('crypto');


exports.sendError=(res,message)=>{
    return res.status(401).json({success:false,error:(message)})
}

exports.cryptoRandomBytes = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(32, (err, buffer) => {
            if (err) reject(err);
            resolve(buffer.toString('hex'));
        });
    });
};
