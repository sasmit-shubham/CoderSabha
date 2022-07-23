const otpServices = require('../services/otp-services');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');

class Authcontroller {
    async sendOtp(req, res) {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ message: "phone field is required" });
        }

        const otp =  otpServices.generateOtp();

        // hash services
        const ttl = 1000 * 60 * 2;// time to leave
        const expires = Date.now() + ttl;
        console.log("generating expires: ",expires);
        const data = `${phone}.${otp}.${expires}`;
        // console.log(data);
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

    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;
        if (!otp || !hash || !phone) {
            res.status(400).json({ message: "All fields are required" });
        }
        const [hashedOtp, expires] = hash.split('.');
        console.log(expires,Date.now());
        if (Date.now() > +expires) {
            res.status(400).json({ message: "otp expired" });
        }
        // console.log("hh");
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

        tokenService.storeRefreshToken(refreshToken,user._id);

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
        const {refreshToken: refreshTokenFromCookie} = req.cookies;
        let userData;
        // check if token is valid
        try {
            userData = await tokenService.verifyRefreshToken(refreshToken);
        } catch (error) {
          return res.status(401).json({message:'Invalid Token'});   
        }
        // check if token is in database
        try {
            const token = await tokenService.findRefreshToken(
                userData._id, 
                refreshTokenFromCookie
            )

            if(!token){
                return res.status(401).json({
                    message:'invalid token'
                }) 
            }
        } catch (error) {
            return res.status(500).json({
                message:'invalid token'
            })
        }

        const user = await userService.findUser({_id:userData._id});
        if(!user){
            return res.result(404).json({message:'No User'});
        }
        // generate new tokens
        const {refreshToken, accessToken} = tokenService.generateToken({
            _id: userData._id,
        })

        try {
            await tokenService.updateRefreshToken(refreshToken);
        } catch (error) {
            return res.status(500).json({
                message:'internal error',
            })
        }
        //update refreshtoken
        // put in cookie
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

        // response
    }
}

module.exports = new Authcontroller();    
