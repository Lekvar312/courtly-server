import Court from '../models/Court.js'

class courtController {

  async createCourt (req, res) {
    const {name, address, type, price, workingHours} = req.body
    try{
      const court = new Court({
        name, address, type, price, workingHours
      })
      await court.save()
      res.status(200).json({ message:"Корт успішно додано" })
    }catch(e){
      res.status(500).json({ message:"Помилка сервера", error: e.message })
    }
  }

  async getCourts (req, res) {
    try{
      const courts = await Court.find()
      res.status(200).json(courts)
    }catch(e){
      res.status(500).json({ message:"Помилка сервера", error: e.message })
    }
  }

  async getCourtById (req, res) {
    const {id} = req.params
    try{
      const court = await Court.findById(id)
      if(!court) return res.status(404).json({ message:"Майданчик не знайдено" })
      res.status(200).json(court)
    }catch(e){
      res.status(500).json({ message:"Помилка сервера", error: e.message })
    }
  }

  async editCourt (req, res) {
    const {id} = req.params
    const {name, address, type, price, workingHours} = req.body
    try{
      const court = await Court.findByIdAndUpdate(
        id,
        {name, address, type, price, workingHours},
        {new: true, runValidators: true}
      )
      if(!court) return res.status(404).json({ message: "Майданчик не знайдено" })
      res.status(200).json({ message:"Майданчик успішно оновлений", court })
    }catch(e){
      res.status(500).json({ message:"Помилка сервера", error: e.message })
    }
  }

  async deleteCourt (req, res) {
    const {id} = req.params
    try{
      const court = await Court.findByIdAndDelete(id)
      if(!court) return res.status(404).json({ message:"Майданчик не занайдено" })
      res.status(200).json({ message:"Майданчик успішно видалено" })
    }catch(e){
      res.status(500).json({ message:"Помилка сервера", error: e.message })
    }
  }

}

export default new courtController()