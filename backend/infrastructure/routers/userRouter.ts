import Router from 'express';
import {check} from 'express-validator';
import authMiddleware from '../middleware/authMiddleware';
import refreshUserMiddleware from '../middleware/refreshUserMiddleware';
import {userController} from "../../.config";

const router = Router();

router.post('/api/signup', [
    check('email', "Email is required").notEmpty(),
    check('email', "Incorrect email format").isEmail(),
    check('password', "Passwords must has between 8 and 24 characters").isLength({min: 7, max: 24}),
    check('timezoneOffset', "Timezone must be integer between -12 and 12").isInt({min: -12, max: 12}),
], userController.signup.bind(userController))

router.post('/api/login', [
    check('email', "Email is required").notEmpty(),
    check('email', "Incorrect email format").isEmail(),
], userController.login.bind(userController))

router.post('/api/logout', userController.logout.bind(userController))
router.get('/api/updateTokens', userController.updateTokens.bind(userController))
router.get('/api/getUser', authMiddleware, refreshUserMiddleware, userController.getUser.bind(userController))
router.get('/api/activate/:link', userController.activate.bind(userController))
router.post('/api/resendActivationLink', userController.resendActivationLink.bind(userController))
router.post('/api/updateFirstName', authMiddleware, userController.updateFirstName.bind(userController))
router.post('/api/updateLastName', authMiddleware, userController.updateLastName.bind(userController))
router.post('/api/changePassword',
    check('newPassword', "Password must has between 8 and 24 characters").isLength({min: 7, max: 24}),
    check('oldPassword', "Password can not be empty").notEmpty(),
    authMiddleware, userController.changePassword.bind(userController))
router.post('/api/sendNewPassword', userController.sendNewPassword.bind(userController))

export default router;