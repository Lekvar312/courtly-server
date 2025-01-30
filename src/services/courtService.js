import Court from '../models/Court.js'
import fileService from './fileService.js'

class courtService {
  async createCourt(court, picture) {
    try {
      const picturePath = fileService.saveFile(picture); 
      const newCourt = new Court({ ...court, picture: picturePath }); 
      await newCourt.save();
      return newCourt;
    } catch (e) {
      throw new Error(e.message);
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
  async editCourt({ id, name, address, type, price, workingHours, picture }) {
    try {
      const court = await Court.findById(id);
      if (!court) throw new Error("Майданчик не знайдено");
  
      const updateData = { name, address, type, price, workingHours };
  
      if (picture) {
        if (court.picture) {
          fileService.deleteFile(court.picture); 
        }
        const picturePath = fileService.saveFile(picture); 
        updateData.picture = picturePath;
      }
  
      const updatedCourt = await Court.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      return updatedCourt;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async deleteCourt (id) {
    try{
      const court = await Court.findById(id)
      if(!court) throw new Error ("Майданчик не занайдено")

      if (court.picture) {
        fileService.deleteFile(court.picture)
      }
      
      await Court.findByIdAndDelete(id)
      return true
    }catch(e){
      throw new Error(e.message)
    }
  }
}

export default new courtService()