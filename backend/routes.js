const router = require('express').Router();
const activateController = require('./controllers/activate-controller')
const authcontroller = require('./controllers/auth-controller');
const authMiddleware = require('./middlewares/auth-middleware');
router.post('/api/send-otp', authcontroller.sendOtp);
router.post('/api/verify-otp', authcontroller.verifyOtp);
router.post('/api/activate',authMiddleware, activateController.activate);
router.post('api/refresh',authcontroller.refresh);
module.exports = router;
