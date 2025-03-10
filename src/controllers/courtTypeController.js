import courtTypeService from "../services/courtTypeService.js";

class courtTypeController {
  async createCourtType (req, res) {
    try {
      const { name } = req.body
      const courtType = await courtTypeService.createCourtType(name)
      res.status(200).json({message: "Тип майданчика успішно додано", courtType })
    } catch (error) {
      res.status(500).json({message: "Помилка сервера", error: error.message})
    }
  }

  async getCourtType (req, res) {
    try {
      const courtTypes = await courtTypeService.getCourtType()
      res.status(200).json(courtTypes)
    } catch (error) {
      res.status(500).json({message: "Помилка сервера", error: error.message})
    }
  }

  async getCourtTypeById(req, res) {
    const { id } = req.params;
    try {
      const courtType = await courtTypeService.getCourtTypeById(id);
      res.status(200).json(courtType);
    } catch (e) {
      res.status(500).json({ message: "Помилка сервера", error: e.message });
    }
  }
  
  async editCourtTypes (req, res) {
    const { id } = req.params
    const { name } = req.body
    try {
      const courtType = courtTypeService.editCourtType(id, name)
      res.status(200).json({message: "Успішно відредаговано", courtType})
    } catch (error) {
      res.status(500).json({message: "Помилка сервера", error: error.message})
    }
  }

  async deleteCourtType(req, res) {
    const { id } = req.params;
    try {
      await courtTypeService.deleteCourtType(id);
      res.status(200).json({ message: "Тип майданчика успішно видалено" });
    } catch (e) {
      res.status(500).json({ message: "Помилка сервера", error: e.message });
    }
  }
}

export default new courtTypeController