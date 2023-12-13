import Store from "../models/Store.js";
const getStore = async (limit, page) => {
  try {
    // use exec() to get a real Promise
    try {
      const result = await Store.find().limit(limit).skip(limit * page).exec();
      const count = await Store.countDocuments().exec();
      console.log("Count:", count);
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

const createCommentService = async (id, comment = {
  user_id: "657982544331b25b94fbe9b9",
  content: "content",
  rating: 5,
}) => {
  console.log(id, comment);
  try {
    const store = await Store.find ({id: id});
    if(store.reviews){
      store.reviews.push(comment);
      await Store.updateOne({id: id}, {reviews: store.reviews});
    }
    else{
      store.reviews = [comment];
      await Store.updateOne({id: id}, {reviews: store.reviews});
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
module.exports = {
  getStore,
  getStoreDetail,
  getStoreByName,
  createCommentService,
};
