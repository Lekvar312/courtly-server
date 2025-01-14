import express from 'express'
import User from '../Models/User.js'

const router  = express.Router()

router.post('/register', async (req, res)=> {
  const {name,email,password} = req.body
  try{
    const user = new User({name, email, password})
    await user.save()
    res.status(201).json({ message: 'Користувача створено успішно', user });
  }catch(e){
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
})

export default router