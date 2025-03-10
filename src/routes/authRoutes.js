import express from 'express'
import authController from '../controllers/authController.js'
import { validationMiddleware } from '../middleware/validationMiddleware.js'
import { signupValidationSchema, loginValidationSchema} from '../validation/authValidationSchema.js'
const router = express.Router()


router.post('/signup',signupValidationSchema, validationMiddleware, authController.signup)

router.post('/login',loginValidationSchema, validationMiddleware, authController.login)

router.post('/logout', authController.logout)

router.get('/refresh',  authController.refresh)

export default router