import userService from '../services/userService.js'

class userController {

  async createUser (req, res) {
    const {name,email,password, role} = req.body
    try{
      const user = await userService.createUser({name, email, password, role}) 
      res.status(201).json({ message: 'Користувача створено успішно', user });
    }catch(e){
      res.status(500).json({ message: 'Помилка сервера', error: e.message });
    }
  }
async getCurrentUser (req, res) {
  try {
    // Поточний користувач знаходиться в req.user, який було додано через authMiddleware
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }
    res.status(200).json(currentUser);
  } catch (e) {
    res.status(500).json({ message: 'Помилка сервера', error: e.message });
  }
}

  async getUsers (req, res) {
    try {
      const users = await userService.getUsers()
      res.status(200).json(users); 
    } catch (e) {
      res.status(500).json({ message: 'Помилка сервера', error: e.message });
    }
  }
  async getUserById (req, res) {
    const {id} = req.params
    try{
      const user = await userService.getUserById({id})
      if (!user) return res.status(404).json({message:"Користувача не знайдено"})
      res.status(200).json(user)
    }catch(e){
      res.status(500).json({ message: 'Помилка сервера', error: e.message });
    }
  }
  async editUser (req, res) {
    const {id} = req.params
    const {name, email, password, role } = req.body
    try{
      const user = await userService.editUser({id, name, email, password, role})
      res.status(200).json({message: "Дані користувача успішно оновлено", user})
    }catch(e){
      res.status(500).json({ message: 'Помилка сервера', error: e.message });
    }
  }
  async deleteUser (req, res) {
    const {id} = req.params
    try{
      const user = await userService.deleteUser(id)
      res.status(200).json({message:'Користувача успішно видалено'})  
    }catch(e){
      res.status(500).json({ message: 'Помилка сервера', error: e.message });
    }
  }
}

export default new userController()