import Court from '../models/Court.js'

class courtService {
  async createCourt ({name, address, type, price, workingHours}) {
    try{
      const court = await new Court({ name, address, type, price, workingHours })
      await court.save()
      return court
    }catch(e){
      throw new Error (e.message)
    }
  }
  async getCourts () {
    try{
      const courts = await Court.find()
      return courts 
    }catch(e){
      throw new Error (e.message)
    }
  }
  async getCourtById (id) {
    try{
      const court = await Court.findById(id)
      if(!court) throw new Error ("Майданчик не знайдено")
      return court 
    }catch(e){
      throw new Error(e.message)
    }
  }
  async editCourt ({id, name, address, type, price, workingHours}) {
    try{
      const court = await Court.findByIdAndUpdate(
        id,
        {name, address, type, price, workingHours},
        {new: true, runValidators: true}
      )
      if(!court) throw new Error("Майданчик не знайдено")
      return court
    }catch(e){
      throw new Error(e.message)
    }
  }
  async deleteCourt (id) {
    try{
      const court = await Court.findByIdAndDelete(id)
      if(!court) throw new Error ("Майданчик не занайдено")
      return true
    }catch(e){
      throw new Error(e.message)
    }
  }
}

export default new courtService()