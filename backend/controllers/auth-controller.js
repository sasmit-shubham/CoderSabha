const otpServices =  require('../services/otp-services');
const hashService =  require('../services/hash-service');
const userService =  require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto =      require('../dtos/user-dto');

class Authcontroller {
    async sendOtp(req, res) {
        const { phone } = req.body;
        console.log(phone);
        if (!phone) {
            return res.status(400).json({ message: "phone field is required" });
        }
        const otp =  otpServices.generateOtp();
        // hash services
        const ttl = 1000 * 60 * 2;// time to leave
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data); 
        // send otp 
        try {
            // await otpServices.sendBySms(phone, otp);
            return res.json({
                hash: `${hash}.${expires}`, phone,otp,
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "message sending failed" });
        }
    }

    async sendOtpEmail(req,res){
        const { email } = req.body;
        console.log(email);
        if (!email) {
            return res.status(400).json({ message: "email field is required" });
        }
        const otp = otpServices.generateOtp();
        const ttl = 1000*60*2;
        const expires = Date.now() + ttl;
        const data = `${email}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        try{
            return res.json({
                hash: `${hash}.${expires}`,email,otp
            })
        }catch(err){
            console.log(err)
            res.status(500).json({message:"message sending failed"})
        }

    }

    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;
        if (!otp || !hash || !phone) {
            res.status(400).json({ message: "All fields are required" });
        }
        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            res.status(400).json({ message: "otp expired" });
        }
        
        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpServices.verifyOtp(hashedOtp, data);
        
        if (!isValid) {
            return res.status(400).json({ message: "invalid otp" });
        }
        
        let user;
        // since it is database query so we will keep this in try catch statement
        
        try {
            user = await userService.findUser({phone});
            if (!user) {
                user =  await userService.createUser({phone});
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Db error" });
        }
        
        // token generation
        const { accessToken, refreshToken } = tokenService.generateToken({
            _id: user._id,
            activated: false,
        });

        await tokenService.storeRefreshToken(refreshToken,user._id);

        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        const userDto = new UserDto(user);
        res.json({user:userDto,auth:true });
    }

    async refresh(req, res){
        // get refresh token from cookie
        const refresh_token = req.cookies['refreshToken'];
        // check if token 
        let userData;
        try {
            userData = await tokenService.verifyRefreshToken(
                refresh_token
            );
        } catch (error) {
          return res.status(401).json({message:`${error}`});   
        }
        // check if token is in database
        try {
            const token = await tokenService.findRefreshToken(
                userData._id, 
                refresh_token
            )

            if(!token){
                return res.status(401).json({
                    message:'invalid token'
                }) 
            }
        } catch (error) {
            return res.status(500).json({
                message:'internal server error'
            })
        }
        // check if user is valid
        const user = await userService.findUser({_id:userData._id});
        if(!user){
            return res.result(404).json({message:'No User'});
        }
        // generate new tokens
        const {refreshToken, accessToken} = tokenService.generateToken({
            _id: userData._id,
        })
        // update the refreshTokens
        try {
            await tokenService.updateRefreshToken(userData._id,refreshToken);
        } catch (error) {
            return res.status(500).json({
                message:'internal error',
            })
        }
        // put in cookie
        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        // response
        const userDto = new UserDto(user);
        res.json({user:userDto,auth:true });
 
    }

    async logout(req,res){
        // delete refresh token from db
        const {refreshToken} = req.cookies;
        try {
            await tokenService.removeToken(refreshToken);
        } catch (error) {
            res.status(401).json({message:"logout is not working"});
        }
        
        // delete cookies
        try {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken'); 
        } catch (error) {
            res.status(401).json({message:"delete cokkies is not working"})
        }
        
        res.json({user:null,auth:false});

    }
}

module.exports = new Authcontroller();    
