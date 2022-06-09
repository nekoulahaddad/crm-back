import { Order } from "../models/order";
import { Reviews } from "../models/reviews";

export const getReviews = async (req, res) => {
  let { limit, page, sort_field, sort_direction, searchByStatus } = req.query;
  const { shopId } = req.params;
  limit = parseInt(limit);
  try {
    let reviews;
    if (!searchByStatus) {
      reviews = await Reviews.find({ shop_id: shopId })
        .populate({
          path: "order_id",
          select: "city",
          populate: {
            path: "city",
            select: "name",
          },
        })
        .limit(limit)
        .skip(limit * page)
        .sort({ [sort_field]: sort_direction });
    } else {
      if (searchByStatus === "published") {
        reviews = await Reviews.find({
          $and: [
            { status_id: "627d059ac572d24500642317" },
            { shop_id: shopId },
          ],
        })
          .populate({
            path: "shop_id",
            select: "city",
            populate: {
              path: "city",
              select: "name",
            },
          })
          .limit(limit)
          .skip(limit * page)
          .sort({ [sort_field]: sort_direction });
      }

      if (searchByStatus === "rejected") {
        reviews = await Reviews.find({
          $and: [
            { status_id: "627d059ac572d24500642317" },
            { shop_id: shopId },
          ],
        })
          .populate({
            path: "shop_id",
            select: "city",
            populate: {
              path: "city",
              select: "name",
            },
          })
          .limit(limit)
          .skip(limit * page)
          .sort({ [sort_field]: sort_direction });
      }

      if (searchByStatus === "moderation") {
        reviews = await Reviews.find({
          $and: [
            { status_id: "627d059ac572d24500642317" },
            { shop_id: shopId },
          ],
        })
          .populate({
            path: "shop_id",
            select: "city",
            populate: {
              path: "city",
              select: "name",
            },
          })
          .limit(limit)
          .skip(limit * page)
          .sort({ [sort_field]: sort_direction });
      }
    }

    res.send({
      status: "ok",
      message: reviews,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const addReview = async (req, res) => {
  const { feedback, order_id, score, shop_id } = req.body;

  try {
    const newReview = await Reviews.create({
      feedback,
      order_id,
      score,
      shop_id,
      managerReply: " ",
    });
    res.send({
      status: "ok",
      message: newReview,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const addReply = async (req, res) => {
  const { managerReply } = req.body;
  const { orderId } = req.params;

  try {
    await Reviews.findOneAndUpdate(
      { order_id: orderId },
      { managerReply: managerReply }
    );
    res.send({
      status: "ok",
      message: "Ответ добавлен",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const editReview = async (req, res) => {
  const { feedback, score } = req.body;
  const { orderId } = req.params;

  try {
    await Reviews.findOneAndUpdate(
      { order_id: orderId },
      { feedback: feedback, score: score }
    );
    res.send({
      status: "ok",
      message: "Отзыв отредактирован",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Reviews.findById({ _id: id });

    if (!review) {
      return res.status(404).send({
        status: "error",
        message: "Отзыв не найден",
      });
    }
    await review.remove();

    res.send({
      status: "ok",
      message: "Отзыв удален",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};
