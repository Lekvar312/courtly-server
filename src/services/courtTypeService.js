import CourtType from "../models/CourtType.js";
import Court from "../models/Court.js";

class courtTypeService {
  async createCourtType(name) {
    try {
      const existingCourtType = await CourtType.findOne({ name });
      if (existingCourtType) throw new Error("Такий тип майданчика вже існує");

      const courtType = new CourtType({ name });
      await courtType.save();
      return courtType;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getCourtType() {
    try {
      const courtTypes = await CourtType.find();
      return courtTypes;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getCourtTypeById(id) {
    try {
      const courtType = await CourtType.findById(id);
      if (!courtType) throw new Error("Тип майданчика не знайдено");
      return courtType;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async editCourtType(id, name) {
    try {
      const courtType = await CourtType.findById(id);
      if (!courtType) throw new Error("Тип майданчика не знайдено");

      courtType.name = name;

      await courtType.save();
      return { _id: courtType._id, name: courtType.name };
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteCourtType(id) {
    try {
      const courtType = await CourtType.findById(id);
      if (!courtType) throw new Error("Тип майданчика не знайдено");
      const isTypeUsed = await Court.exists({ courtType: id });
      if (isTypeUsed) throw new Error("Неможливо видалити тип, оскільки він використовується");
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default new courtTypeService();
