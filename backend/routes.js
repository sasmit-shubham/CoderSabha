
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
const router = require('express').Router();
const activateController = require('./controllers/activate-controller')
const authcontroller = require('./controllers/auth-controller');
const authMiddleware = require('./middlewares/auth-middleware');
const roomscontroller = require('./controllers/rooms-controller')
router.post('/api/send-otp', authcontroller.sendOtp);
router.post('/api/verify-otp', authcontroller.verifyOtp);
router.post('/api/activate',authMiddleware, activateController.activate);
router.get('/api/refresh',authcontroller.refresh);
router.post('/api/logout',authMiddleware,authcontroller.logout);
router.post('/api/rooms',authMiddleware,roomscontroller.create);
router.get('/api/rooms',authMiddleware,roomscontroller.index);
module.exports = router;
