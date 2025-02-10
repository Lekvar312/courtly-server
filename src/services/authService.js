import User from '../models/User.js'
import tokenService from './tokenService.js'
import bcrypt from 'bcrypt'

class authService {

  async signup (name, email, password) {
    const candidate = await User.findOne({email})
    if(candidate) throw new Error ("Користувач з таким email вже існує")

    const hashPassword = await bcrypt.hash(password, 7)
    const user = await User.create({name, email, password: hashPassword})

    const tokens = tokenService.generateTokens({
      id: user._id,
      name: user.name,
      email: user.email,
    })
    await tokenService.saveToken(user._id, tokens.refreshToken)

    return {...tokens, user: user.toObject()}
  }


}

export default new authService ()