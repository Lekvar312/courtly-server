import express from 'express'
import User from '../Models/User.js'

const router  = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    res.status(200).json(users); 
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  const {id} = req.params
  try{
    const user = await User.findById(id)
    if (!user) return res.status(404).json({message:"Користувача не знайдено"})
    res.status(200).json(user)
  }catch(e){
    res.status(500).json({ message: 'Помилка сервера', error: e.message });
  }
})

router.put('/:id', async(req, res) => {
  const {id} = req.params
  const {name, email } = req.body
  try{
    const user = await User.findByIdAndUpdate(
      id,
      {name, email},
      {new: true, runValidators: true}
    )
    if (!user) return res.status(404).json({message:"Користувача не знайдено"})
    res.status(200).json({message: "Дані користувача успішно оновлено", user})
  }catch(e){
    res.status(500).json({ message: 'Помилка сервера', error: e.message });
  }
})

router.delete('/:id', async(req, res) => {
  const {id} = req.params
  try{

    const user = await User.findByIdAndDelete(id)
    if (!user) return res.status(404).json({message:"Користувача не знайдено"})
    res.status(200).json({message:'Користувача успішно видалено'})  

  }catch(e){
    res.status(500).json({ message: 'Помилка сервера', error: e.message });
  }
})

router.post('/register', async (req, res)=> {
  const {name,email,password} = req.body
  try{
    const user = new User({name, email, password})
    await user.save()
    res.status(201).json({ message: 'Користувача створено успішно', user });
  }catch(e){
    res.status(500).json({ message: 'Помилка сервера', error: e.message });
  }
})

export default router