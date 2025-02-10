import express from 'express'
import userController from '../controllers/userController.js'
import {userCreateValidationSchema, userEditValidationSchema} from '../validation/userValidationSchema.js'
import { validationMiddleware } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.post('/', userCreateValidationSchema, validationMiddleware,  userController.createUser)

router.get('/', userController.getUsers)

router.get('/:id', userController.getUserById)

router.put('/:id',userEditValidationSchema, validationMiddleware,  userController.editUser)

router.delete('/:id',userController.deleteUser)

export default router