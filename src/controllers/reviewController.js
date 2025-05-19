import ReviewService from "../services/reviewService.js";
class ReviewController {
  async createReview(req, res) {
    try {
      const review = await ReviewService.createReview(req.body);
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: "Не вдалося створити відгук", error: error.message });
    }
  }

  async getAllReview(req, res) {
    try {
      const reviews = await ReviewService.getAllReviews();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Не вдалося отримати всі відгуки", error: error.message });
    }
  }

  async getReviewByID(req, res) {
    try {
      const { id } = req.params;
      const review = await ReviewService.getReviewById(id);
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: "Не вдалося отримати відгук", error: error.message });
    }
  }
  async updateReview(req, res) {
    try {
      const { id } = req.params;
      const udpateReview = await ReviewService.updateReview(id, req.body);
      res.status(200).json(udpateReview);
    } catch (error) {
      res.status(500).json({ message: "Не вдалося оновити відгук", error: error.message });
    }
  }

  async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const deletedReview = await ReviewService.deleteReview(id);
      res.status(200).json({ message: "Успішно видалено відгук", review: deletedReview });
    } catch (error) {
      res.status(500).json({ message: "Не вдалося видалити відгук", error: error.message });
    }
  }
}

export default new ReviewController();
