import Court from "../models/Court.js";
import CourtType from "../models/CourtType.js";
import fileService from "./fileService.js";

class courtService {
  async createCourt(court, picture) {
    try {
      const { type, workingHours } = court;

      const parsedWorkingHours = workingHours ? JSON.parse(workingHours) : { startTime: "08:00", endTime: "23:00" };

      const courtType = await CourtType.findOne({ name: type });
      if (!courtType) throw new Error("Такий тип майданчика не існує");

      const picturePath = picture ? fileService.saveFile(picture) : null;

      const newCourt = new Court({
        ...court,
        type: courtType._id,
        picture: picturePath,
        workingHours: parsedWorkingHours,
      });

      await newCourt.save();

      await newCourt.populate("type", "name");

      return newCourt;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getCourts(filter = {}, sort = {}) {
    const query = {};
    try {
      if (filter.name) {
        query.name = { $regex: filter.name, $options: "i" };
      }
      if (filter.type) {
        query.type = filter.type;
      }
      return await Court.find(query).sort(sort).populate("type", "name");
    } catch (error) {
      throw new Error(error);
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
