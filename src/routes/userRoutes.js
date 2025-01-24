import express from 'express'
import userController from '../controllers/userController.js'
import { createUserValidationSchema, editUserValidationSchema } from '../validation/userValidationSchema.js'
import { validationMiddleware } from '../middleware/validationMiddleware.js'


const router = express.Router()

router.post('/register',validationMiddleware(createUserValidationSchema),  userController.registration)

router.get('/', userController.getUsers)

router.get('/:id', userController.getUserById)

router.put('/:id',validationMiddleware(editUserValidationSchema), userController.editUser)

router.delete('/:id',userController.deleteUser)

export default router