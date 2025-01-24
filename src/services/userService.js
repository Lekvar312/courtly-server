import User from '../models/User.js'

class userService {
  async registration ({name, email, password}) {
    try{
      const existingUser = await User.findOne({email})
      if(existingUser) throw new Error ("Користувач з таким email вже існує ")
      const user = new User({name, email, password})
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
  async editUser ({id, name, email, password}) {
    try{
      const user = await User.findByIdAndUpdate(
        id,
        {name, email, password},
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