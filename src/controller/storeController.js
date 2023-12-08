import { getStore } from "../service/storeService.js";
const getStoreController = async (req, res) => {
  const { limit, page } = req.query;
  const result = await getStore(limit, page);
  return res.status(200).json(result);
};
module.exports = {
  getStoreController,
};
