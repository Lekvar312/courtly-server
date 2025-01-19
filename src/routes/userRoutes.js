import express from 'express'
import User from '../Models/User.js'
import userController from '../controllers/userController.js'
const router  = express.Router()

router.post('/register', userController.registration)

router.get('/', userController.getUsers)

router.get('/:id', userController.getUserById)

router.put('/:id', userController.editUser)

router.delete('/:id',userController.deleteUser)

export default router