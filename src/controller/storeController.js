import { getStore, getStoreDetail, getStoreByName } from "../service/storeService.js";
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

const getStoreByNameController = async (req, res) => {
  const { name } = req.params;
  console.log(req.params);
  const result = await getStoreByName(name);
  return res.status(200).json(result);
}

module.exports = {
  getStoreController,
  getStoreDetailController,
  getStoreByNameController
};
