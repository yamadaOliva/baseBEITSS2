import Store from "../models/Store.js";
const getStore = async (limit, page) => {
  try {
    const stores = await Store.find()
      .skip((page-1) * limit)
      .limit(limit);
      console.log(stores);
    return {
      EC: 200,
      data: stores,
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
}

module.exports = {
  getStore,
  getStoreDetail,
};
