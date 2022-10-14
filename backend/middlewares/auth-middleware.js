const tokenService = require("../services/token-service");

module.exports = async function(req,res,next) {
    try{
        const {accessToken} = req.cookies;
        if(!accessToken){
            throw new Error();
        }
        const userData = await tokenService.verifyAccessToken(accessToken);
        if(!userData){
            throw new Error();
        }
        req.user = userData;
        console.log("*********middleware************");
        console.log(req.user);
        console.log("*********** the end of the middleware ************");
        next();
        
    }catch(err){
        res.status(401).json({message:`${err}`});
    }
}