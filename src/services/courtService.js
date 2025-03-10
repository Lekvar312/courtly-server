import Court from '../models/Court.js'
import CourtType from '../models/CourtType.js'
import fileService from './fileService.js'

class courtService {
  async createCourt(court, picture) {
    try {
      const { type } = court;

      const courtType = await CourtType.findOne({ name: type });
      if (!courtType) throw new Error("Такий тип майданчика не існує");

      const picturePath = picture ? fileService.saveFile(picture) : null;
      const newCourt = new Court({ ...court, type: courtType._id, picture: picturePath });

      await newCourt.save();
      return newCourt;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getCourts() {
    try {
      const courts = await Court.find().populate("type", "name");
      return courts;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getCourtById(id) {
    try {
      const court = await Court.findById(id).populate("type", "name");
      if (!court) throw new Error("Майданчик не знайдено");
      return court;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async editCourt({ id, name, address, type, price, workingHours, picture }) {
    try {
      const court = await Court.findById(id);
      if (!court) throw new Error("Майданчик не знайдено");

      const updateData = { name, address, price, workingHours };

      if (type) {
        const courtType = await CourtType.findOne({ name: type });
        if (!courtType) throw new Error("Такий тип майданчика не існує");
        updateData.type = courtType._id;
      }

      if (picture) {
        if (court.picture) {
          fileService.deleteFile(court.picture);
        }
        const picturePath = fileService.saveFile(picture);
        updateData.picture = picturePath;
      }

      const updatedCourt = await Court.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate("type", "name");
      return updatedCourt;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteCourt(id) {
    try {
      const court = await Court.findById(id);
      if (!court) throw new Error("Майданчик не знайдено");

      if (court.picture) {
        fileService.deleteFile(court.picture);
      }

      await Court.findByIdAndDelete(id);
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default new courtService();
