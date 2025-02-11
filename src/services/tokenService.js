import jwt from 'jsonwebtoken'
import Token from '../models/Token.js'

class tokenService {
  generateTokens (payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '30s'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'})
    return {accessToken, refreshToken}
  }

  async saveToken (userId, refreshToken) {
    const tokenData = await Token.findOne({user: userId})
    if(tokenData){
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await Token.create({user: userId, refreshToken })
    return token
  }

  validateAccessToken(token) {
    try{
      const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY)
      return userData
    }catch(e){
      return null;
    }
  }

  validateRefreshToken(token) {
    try{
      const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY)
      return userData
    }catch(e){
      return null;
    }
  }

  async removeToken (refreshToken){
    const tokenData = await Token.deleteOne({refreshToken})
    return tokenData
  }

  async findToken (refreshToken){
    const tokenData = await Token.findOne({refreshToken})
    return tokenData
  }


}

export default new tokenService()
