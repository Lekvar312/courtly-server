import express from 'express'
import userController from '../controllers/userController.js'
import { userValidationSchema } from '../validation/userValidationSchema.js'
import { validate } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.post('/register', userValidationSchema, validate, userController.registration)

router.get('/', userController.getUsers)

router.get('/:id', userController.getUserById)

router.put('/:id',userValidationSchema, validate, userController.editUser)

router.delete('/:id',userController.deleteUser)

export default router