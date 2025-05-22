import User from '../models/User.js'
import tokenService from './tokenService.js'
import bcrypt from 'bcrypt'

class authService {

  async signup (name, email, password, role = 'user') {
    const candidate = await User.findOne({ email });
    if (candidate) throw new Error("Користувач з такою поштою вже існує");
  
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role 
    });
  
    const tokens = tokenService.generateTokens({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  
    await tokenService.saveToken(user._id, tokens.refreshToken);
    return {
      ...tokens,
      user: user.toObject()
    };
  }
  

  async login (email, password) {
    const user = await User.findOne({email})
    if(!user) throw new Error("Користувача не знайдено")
    const isPasswordEquals = await bcrypt.compare(password, user.password)
    if (!isPasswordEquals) throw new Error ("Невірний пароль")
      const tokens = tokenService.generateTokens({
        id:user._id,
        name:user.name,
        email:user.email,
        role: user.role
      })
      await tokenService.saveToken(user._id, tokens.refreshToken)
      return {
        ...tokens,
        user: user.toObject()
      }
  }

  async logout (refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh (refreshToken) {
    if (!refreshToken) throw new Error ("Користувач не авторизовний");
  
    const userData = tokenService.validateRefreshToken(refreshToken)
    if (!userData) throw new Error("Токен недійсний або прострочений");
  
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!tokenFromDb) throw new Error("Токен не знайдено в базі");
  
    const user = await User.findById(userData.id)
    if (!user) throw new Error("Користувач не знайдений");
  
    const tokens = tokenService.generateTokens({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    })
  
    await tokenService.saveToken(user._id, tokens.refreshToken)
  
    return {
      ...tokens,
      user: user.toObject()
    }
  }
}

export default new authService ()