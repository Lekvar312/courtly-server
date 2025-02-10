import authService from '../services/authService.js'

class authController {

  async signup (req, res) {
    try{
      const {name, email, password} = req.body
      const userData =  await authService.signup(name, email, password)
      res.cookie('refreshToken', userData.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
      return res.json(userData)
    }catch(e){
      res.status(400).json({message: "Помилка на стороні сервера", error: e.message})
    } 
  }

  async login (req, res) {
    try{

    }catch(e){
      res.status(400).json({message: "Помилка на стороні сервера", error: e.message})
    } 
  }

  async logout (req, res) {
    try{

    }catch(e){
      res.status(400).json({message: "Помилка на стороні сервера", error: e.message})
    } 
  }

  async refresh (req, res) {
    try{

    }catch(e){
      res.status(400).json({message: "Помилка на стороні сервера", error: e.message})
    } 
  }

}

export default new authController()