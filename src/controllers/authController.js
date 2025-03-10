import authService from '../services/authService.js'

class authController {

  async signup (req, res) {
    try{
      const {name, email, password} = req.body
      const userData = await authService.signup(name, email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    }catch(e){
      res.status(400).json({message: "Помилка на стороні сервера", error: e.message})
    } 
  }

  async login (req, res) {
    try{
      const {email, password} = req.body
      const userData = await authService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    }catch(e){
      res.status(400).json({message: "Помилка на стороні сервера", error: e.message})
    } 
  }

  async logout (req, res) {
    try{
      const {refreshToken} = req.cookies
      const token = await authService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    }catch(e){
      res.status(400).json({message: "Помилка на стороні сервера", error: e.message})
    } 
  }

  async refresh (req, res) {
    try {
      const { refreshToken } = req.cookies
      if (!refreshToken) {
        return res.status(401).json({ message: "Токен не надано" })
      }
      const userData = await authService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      res.status(400).json({ message: "Помилка на стороні сервера", error: e.message })
    }
  }
}

export default new authController()