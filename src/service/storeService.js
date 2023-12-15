import Store from "../models/Store.js";
import User from "../models/User.js";
const getStore = async (params) => {
  const { limit, page, search, name, rating, date, credibility } = params;
  console.log(params);
  try {
    // use exec() to get a real Promise
    try {
      const sort = {
        name: name === "ASC" ? -1 : 1,
        rating: rating === "ASC" ? -1 : 1,
        date: date === "ASC" ? -1 : 1,
        credibility: credibility === "ASC" ? -1 : 1,
      };
      if (search) {
        const result = await Store.find({
          name: { $regex: search, $options: "i" },
        })
          .sort(sort)
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
        .sort(sort)
        .limit(limit)
        .skip(limit * page)
        .exec();
      const count = await Store.countDocuments().exec();
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
  } catch (error) {
    console.log(error);
    return {
      EC: 400,
      message: "Get store failed",
      data: [],
    };
  }
};

const getStoreDetail = async (id) => {
  try {
    const store = await Store.findById(id);
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

const createCommentService = async (
  id,
  comment = {
    user_id: 0,
    content: "content",
    rating: 5,
  }
) => {
  try {
    const store = await Store.findOne({ id: id });
    const user = store.reviews.find((review) => {
      return +review.user_id === comment.user_id;
    });
    if (user) {
      return {
        EC: 400,
        message: "Create comment failed",
        data: [],
      };
    }
    if (store.reviews) {
      comment.id = store.reviews.length + 1;
      store.reviews.push(comment);
      let ptr = Math.ceil(
        (+store.rating * (+store.reviews.length - 1) + +comment.rating) /
          store.reviews.length
      );
      store.rating = ptr;
      await Store.updateOne(
        { id: id },
        { reviews: store.reviews, rating: store.rating }
      );
    } else {
      comment.id = 1;
      store.reviews = [comment];
      store.rating = comment.rating;
      await Store.updateOne(
        { id: id },
        { reviews: store.reviews, rating: store.rating }
      );
    }

    return {
      EC: 200,
      data: store,
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
const getCommentService = async (id) => {
  try {
    const store = await Store.findOne({ id: id }).lean();
    let comments = store.reviews;
    for (let i = 0; i < comments.length; i++) {
      comments[i].username = await getNameUserById(comments[i].user_id);
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
  comment.reactions.push(reaction);
  if (reaction.type === "LIKE") {
    comment.likes++;
  } else {
    comment.dislikes++;
  }
  await Store.updateOne({ id: store_id }, { reviews: store.reviews });
  console.log(comment);
};

module.exports = {
  getStore,
  getStoreDetail,
  getStoreByName,
  createCommentService,
  getCommentService,
  reactService,
};
