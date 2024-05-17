import Router from 'express'
import {emailController} from '../../.config'

const router =  Router()
router.post('/api/sendEmailToWripet',  emailController.sendEmailToWripet.bind(emailController))

export default router;