const jwt = require("jsonwebtoken");
const refreshModel = require("../models/refresh-model");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET
class tokenService  {
    generateToken(payload){
        const accessToken = jwt.sign(payload,accessTokenSecret,{
            expiresIn: "1hr",
        });

        const refreshToken = jwt.sign(payload,refreshTokenSecret,{
            expiresIn: "1y",
        });
        
        return {accessToken,refreshToken};
    }

    async storeRefreshToken(token,userId){
        try{
            await refreshModel.create({
                token,
                userId,
            })
        }catch(err){
            console.log(err.msg);
        }
    }

    async verifyAccessToken(token){
        return jwt.verify(token,accessTokenSecret);
    }

    async verifyRefreshToken(refreshtoken){
        return jwt.verify(refreshtoken,refreshTokenSecret);
    }

    async findRefreshToken(userId, refreshToken){
         return await refreshModel.findOne({
            userId:userId, 
            token:refreshToken
        })
    }
    async updateRefreshToken(userId,refreshToken){
        return await refreshModel.updateOne(
            {userId:userId}, 
            {token:refreshToken}
        )
    }
    
    async removeToken(refreshToken) {
        return await refreshModel.deleteOne({ token: refreshToken });
    }
    
};

module.exports = new tokenService();
