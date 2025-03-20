import User from '../models/User.js'
import bcrypt from 'bcrypt'
class userService {
  async createUser ({name, email, password, role}) {
    try{
      const existingUser = await User.findOne({email})
      if(existingUser) throw new Error ("Користувач з таким email вже існує ")
      const hashPassword = await bcrypt.hash(password, 3)
      const user = new User({name, email, password: hashPassword, role})
      await user.save()
      return user
    }catch(e){
      throw new Error(e.message)
    }
  }
  async getUsers () {
    try {
      const users = await User.find().select('-password'); 
      if(users.length === 0) throw new Error("Користувачів не знайдено")
      return users
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getUserById ({id}) {
    try{
      const user = await User.findById(id)
      if (!user) throw new Error("Користувача не знайдено")
      return user
    }catch(e){
      throw new Error(e.message)
    }
  }
  async editUser ({id, name, email, role, password}) {
    try{
      const user = await User.findByIdAndUpdate(
        id,
        {name, email, password, role},
        {new: true, runValidators: true}
      )
      if (!user) throw new Error("Користувача не знайдено")
      return user
    }catch(e){
      throw new Error(e.message)
    }
  }
  async deleteUser (id) {
    try{
      const user = await User.findByIdAndDelete(id)
      if (!user) throw new Error("Користувача не знайдено")
      return true 
    }catch(e){
      throw new Error(e.message)
    }
  }
}

export default new userService ()