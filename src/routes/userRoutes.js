import express from 'express'
import userController from '../controllers/userController.js'
import {userCreateValidationSchema, userEditValidationSchema} from '../validation/userValidationSchema.js'
import { validationMiddleware } from '../middleware/validationMiddleware.js'
import authMiddleware from '../middleware/authMiddleware.js'
import currentUserMiddleware from '../middleware/currentUserMiddleware.js'

const router = express.Router()

router.post('/', userCreateValidationSchema, validationMiddleware,  userController.createUser)

router.get('/', authMiddleware, userController.getUsers)

router.get('/current',currentUserMiddleware, userController.getCurrentUser)

router.get('/:id',authMiddleware, userController.getUserById)

router.put('/:id',authMiddleware, userEditValidationSchema, validationMiddleware,  userController.editUser)

router.delete('/:id',authMiddleware, userController.deleteUser)

export default router