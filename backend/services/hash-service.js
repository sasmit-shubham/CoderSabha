const crypto = require('crypto');
class hashService{
    hashOtp(data){
        return crypto.createHmac('SHA256',process.env.HASH_SECRET).update(data).digest('hex');
    }
}

module.exports = new hashService();