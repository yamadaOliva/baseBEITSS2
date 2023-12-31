import Store from "../models/Store.js";
import User from "../models/User.js";
import { sendNotification } from "./socket.js";
import { createNotification } from "./notificationService.js";
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const getStore = async (params) => {
  const { limit, page, search } = params;
  const ratingAz = params.ratingAz === "true";
  const ratingZa = params.ratingZa === "true";
  const credibilityAz = params.credibilityAz === "true";
  const credibilityZa = params.credibilityZa === "true";
  const sort = {};
  if (ratingAz) {
    sort.rating = 1;
  }
  if (ratingZa) {
    sort.rating = -1;
  }
  if (credibilityAz) {
    sort.creditibility = 1;
  }
  if (credibilityZa) {
    sort.creditibility = -1;
  }
  try {
    if (search) {
      const result = await Store.find({
        name: { $regex: search, $options: "i" },
      })
        .sort({
          ...sort,
          name: 1,
        })
        .limit(limit)
        .skip(limit * page)
        .exec();
      const count = await Store.find({
        name: { $regex: search, $options: "i" },
      })
        .countDocuments()
        .exec();
      return {
        EC: 200,
        data: result,
        count: count,
        message: "get store successfully",
      };
    }

    const result = await Store.find()
      .sort({
        ...sort,
        name: 1,
      })
      .limit(limit)
      .skip(limit * page)
      .exec();
    const count = await Store.find({
      name: { $regex: search, $options: "i" },
    })
      .countDocuments()
      .exec();
    return {
      EC: 200,
      data: result,
      count: count,
      message: "get store successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      EC: 400,
      message: "Get store failed",
      data: [],
    };
  }
};

const updateCreditibility = async () => {
  try {
    const stores = await Store.find();

    const bulkOps = stores.map((store) => {
      const creditibility =
        parseFloat(store.rating) * store.reviews.length + store.reviews.length;
      console.log(creditibility);
      return {
        updateOne: {
          filter: { _id: store._id },
          update: { creditibility: creditibility },
        },
      };
    });

    await Store.bulkWrite(bulkOps);
    console.log("Creditibility updated successfully.");
  } catch (error) {
    console.error("Error updating creditibility:", error);
  }
};

const getStoreDetail = async (id) => {
  try {
    const store = await Store.findOne({ id: id });
    return {
      EC: 200,
      data: store,
      message: "Get store successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 400,
      message: "Get store failed",
      data: [],
    };
  }
};

const getStoreByName = async (name) => {
  try {
    const store = await Store.find({ name: { $regex: name, $options: "i" } });
    return {
      EC: 200,
      data: store,
      message: "Get store successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 400,
      message: "Get store failed",
      data: [],
    };
  }
};

const createCommentService = async (id, comment) => {
  try {
    const store = await Store.findOne({ id: id });
    // const user = store.reviews.find((review) => {
    //   return +review.user_id === comment.user_id;
    // });
    // if (user) {
    //   return {
    //     EC: 400,
    //     message: "Create comment failed because user has commented",
    //     data: [],
    //   };
    // }
    let images = comment.images.map((image) => {
      return {
        url: image,
      };
    });
    comment.id = store.reviews.length + 1;
    comment.images = images;
    comment.date = new Date();
    // console.log("comment", comment);
    let ptr = store.rating;
    const initialValue = 0;
    const sum = store.reviews.reduce((total, review) =>
      total + Number.parseFloat(review.rating),
      initialValue,
    );

    ptr = (
      (sum + Number.parseFloat(comment.rating)) /
      (store.reviews.length + 1)
    ).toFixed(1);
    const result = await Store.updateOne(
      { id: id },
      { $push: { reviews: comment } }
    );
    console.log("result", result);
    if (result.modifiedCount === 1) {
      let store = await Store.findOne({ id: id });
      const creditibility =
        parseFloat(ptr) * store.reviews.length + store.reviews.length;
      await Store.updateOne(
        { id: id },
        { rating: ptr, creditibility: creditibility }
      );
    } else throw new Error("Create comment failed");

    return {
      EC: 200,
      data: [],
      message: "Create comment successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 400,
      message: "Create comment failed",
      data: [],
    };
  }
};
const getNameUserById = async (id) => {
  try {
    if (!id) return "test";
    const user = await User.findOne({ id: id });
    return user?.username;
  } catch (error) {
    console.log(error);
    return "test";
  }
};
const getAvatarUserById = async (id) => {
  try {
    const user = await User.findOne({ id: id });
    return user?.avatar;
  } catch (error) {
    console.log(error);
    return "test";
  }
};

const getCommentService = async (id) => {
  try {
    const store = await Store.findOne({ id: id }).lean();
    let comments = store.reviews;
    for (let i = 0; i < comments.length; i++) {
      comments[i].username = await getNameUserById(comments[i].user_id);
      comments[i].avatar = await getAvatarUserById(comments[i].user_id);
    }
    return {
      EC: 200,
      data: comments,
      message: "Get comment successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 400,
      message: "Get comment failed",
      data: [],
    };
  }
};

const reactService = async (
  store_id = 1,
  review_id = 1,
  reaction = {
    user_id: 1,
    content: "content",
    type: "LIKE",
  }
) => {
  console.log(store_id, review_id, reaction);
  const store = await Store.findOne({ id: store_id });
  const comment = store.reviews.find((review) => review.id === review_id);
  const user = comment.reactions.find((reactionA) => {
    console.log(reaction.user_id, reaction.user_id);
    return reactionA.user_id === reaction.user_id;
  });
  console.log(user);
  if (user) {
    if (user.type === reaction.type) {
      return {
        EC: 400,
        message: "React failed",
        data: [],
      };
    }
    user.type = reaction.type;
    user.content = reaction.content;
    if (reaction.type === "LIKE") {
      comment.likes++;
      comment.dislikes--;
    } else {
      comment.likes--;
      comment.dislikes++;
    }
    await Store.updateOne({ id: store_id }, { reviews: store.reviews });
    return {
      EC: 200,
      message: "React successfully",
      data: [],
    };
  }
  reaction.id = comment.reactions.length + 1;
  reaction.username = await getNameUserById(reaction.user_id);
  reaction.avatar = await getAvatarUserById(reaction.user_id);
  comment.reactions.push(reaction);
  const sender = await User.findOne({ id: reaction.user_id });
  if (reaction.type === "LIKE") {
    comment.likes++;
  } else {
    comment.dislikes++;
  }
  await Store.updateOne({ id: store_id }, { reviews: store.reviews });
  console.log(comment);
};

const formatReaction = async (reaction) => {
  try {
    const user = await User.findOne({ id: reaction.user_id });

    const result = {
      _id: reaction._id,
      id: reaction.id,
      user_id: reaction.user_id,
      username: user.username,
      avatar: user.avatar,
      fullname: user.fullname,
      content: reaction.content,
      type: reaction.type,
      createdAt: reaction.date,
      updatedAt: reaction.updateAt,
    };
    return result;
  } catch (error) {
    throw error;
  }
};

const formatComment = async (comment) => {
  try {
    const user = await User.findOne({ id: comment.user_id });

    const reactions = await Promise.all(
      comment?.reactions?.map(async (comment) => {
        return await formatReaction(comment);
      })
    );

    const result = {
      id: comment.id,
      user_id: comment.user_id,
      username: user.username,
      avatar: user.avatar,
      fullname: user.fullname,
      images: comment.images,
      content: comment.content,
      rating: comment.rating,
      likes: comment.likes,
      dislikes: comment.dislikes,
      feedbacks: comment.feedbacks,
      reactions,
      createdAt: comment.date,
      updatedAt: comment.updateAt,
    };
    return result;
  } catch (error) {
    throw error;
  }
};

const getListCommentByStoreIdService = async (id) => {
  try {
    const store = await Store.findOne({ id: id }).lean();

    let comments = await Promise.all(
      store?.reviews?.map(async (comment) => {
        return await formatComment(comment);
      })
    );

    comments = comments.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    const result = {
      _id: store._id,
      id: store.id,
      name: store.name,
      address: store.address,
      rating: store.rating,
      images: store.images,
      comments,
    };

    return {
      EC: 200,
      data: result,
      message: "Get store successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 400,
      message: "Get store failed",
      data: [],
    };
  }
};

const createReactionService = async (storeId, reviewId, reaction) => {
  try {
    const store = await Store.findOne({ id: storeId });
    const comment = store.reviews.find(
      (review) => review.id === Number.parseInt(reviewId)
    );
    const user = await User.findOne({ id: reaction.user_id });
    reaction.date = new Date();
    switch (reaction.type) {
      case "LIKE":
        comment.likes++;
        break;
      case "DISLIKE":
        comment.dislikes++;
        break;
      case "FEEDBACK":
        comment.feedbacks++;
        break;
      default:
        break;
    }
    reaction.id = comment.reactions.length + 1;
    reaction.date = new Date();
    comment.reactions.push(reaction);
    const recipient = await User.findOne({ id: comment.user_id });
    const notification = await createNotification({
      recipient: recipient._id,
      sender: user ? user._id : null,
      message: `Đã ${reaction.type
        .toString()
        .toLowerCase()} bình luận của bạn: ${reaction.content}`,
      store: store._id,
    });

    sendNotification(notification);
    await Store.updateOne({ id: storeId }, { reviews: store.reviews });
    let formatedComment = await formatComment(comment);
    return {
      EC: 200,
      message: "Create reaction successfully",
      data: formatedComment,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 400,
      message: "Create reaction failed",
      data: [],
    };
  }
};
module.exports = {
  getStore,
  getStoreDetail,
  getStoreByName,
  createCommentService,
  getCommentService,
  reactService,
  getListCommentByStoreIdService,
  createReactionService,
};
