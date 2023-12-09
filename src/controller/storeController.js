import { getStore, getStoreDetail } from "../service/storeService.js";
const getStoreController = async (req, res) => {
  const { limit, page } = req.query;
  const result = await getStore(limit, page);
  return res.status(200).json(result);
};

const getStoreDetailController = async (req, res) => {
  const { id } = req.params;
  const result = await getStoreDetail(id);
  return res.status(200).json(result);
}
module.exports = {
  getStoreController,
  getStoreDetailController,
};
