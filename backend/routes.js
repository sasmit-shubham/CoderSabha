const router = require('express').Router();
const authcontroller = require('./controllers/auth-controller');
router.post('/api/send-otp', authcontroller.sendOtp)
router.post('/api/verify-otp', authcontroller.verifyOtp)

module.exports = router;
