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

module.exports = {
  getStore,
  getStoreDetail,
};
