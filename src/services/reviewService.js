import Review from "../models/Review.js";

class ReviewService {
  async createReview(data) {
    try {
      const review = await Review.create(data);
      return review;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllReviews() {
    try {
      const reviews = await Review.find();
      return reviews;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getReviewById(id) {
    try {
      const review = await Review.findById(id);
      if (!review) throw new Error("Такого відгука не існує");
      return review;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateReview(id, data) {
    try {
      const updateReview = await Review.findByIdAndUpdate(id, data, { new: true });
      if (!updateReview) throw new Error("Такого відгука не існує");
      return updateReview;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteReview(id) {
    try {
      const deletdReveiw = await Review.findByIdAndDelete(id);
      if (!deletdReveiw) throw new Error("Такого відгука не існує");
      return deletdReveiw;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new ReviewService();
