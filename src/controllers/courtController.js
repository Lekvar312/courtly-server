import courtService from '../services/courtService.js'

class courtController {
  async createCourt(req, res) {
    
    try {
      const court = await courtService.createCourt(req.body, req.files?.picture);
      res.status(200).json({ message: "Корт успішно додано", court });
    } catch (e) {
      res.status(500).json({ message: "Помилка сервера", error: e.message });
    }
  }

  async getCourts(req, res) {
    const { name } = req.query;
    try {
      let courts;
  
      if (name) {
        courts = await courtService.getCourts({ name });
      } else {
        courts = await courtService.getCourts();
      }
  
      res.status(200).json(courts);
    } catch (e) {
      res.status(500).json({ message: "Помилка сервера", error: e.message });
    }
  }
  


  async getCourtById(req, res) {
    const { id } = req.params;
    try {
      const court = await courtService.getCourtById(id);
      res.status(200).json(court);
    } catch (e) {
      res.status(500).json({ message: "Помилка сервера", error: e.message });
    }
  }

  async editCourt(req, res) {
    const { id } = req.params;
    const { name, address, type, price, workingHours } = req.body;
    const picture = req.files?.picture;

    try {
      const court = await courtService.editCourt({ id, name, address, type, price, workingHours, picture });
      res.status(200).json({ message: "Майданчик успішно оновлений", court });
    } catch (e) {
      res.status(500).json({ message: "Помилка сервера", error: e.message });
    }
  }

  async deleteCourt(req, res) {
    const { id } = req.params;
    try {
      await courtService.deleteCourt(id);
      res.status(200).json({ message: "Майданчик успішно видалено" });
    } catch (e) {
      res.status(500).json({ message: "Помилка сервера", error: e.message });
    }
  }
}

export default new courtController();
