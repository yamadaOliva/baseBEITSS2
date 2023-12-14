import {
  getStore,
  getStoreDetail,
  getStoreByName,
  createCommentService,
  reactService,
  getCommentService,
} from "../service/storeService.js";
const getStoreController = async (req, res) => {
  const params = req.query;
  const result = await getStore(params);
  return res.status(200).json(result);
};

const getStoreDetailController = async (req, res) => {
  const { id } = req.params;
  const result = await getStoreDetail(id);
  return res.status(200).json(result);
};

const getStoreByNameController = async (req, res) => {
  const { name } = req.params;
  console.log(req.params);
  const result = await getStoreByName(name);
  return res.status(200).json(result);
};

const createCommentController = async (req, res) => {
  const { id } = req.params;
  const comment = req.body;
  console.log(comment, id);
  const result = await createCommentService(id, comment);
  return res.status(200).json(result);
};

const reactController = async (req, res) => {
  const id  = req.params;
  console.log(id);
  const react = req.body;
  const result = await reactService();
  return res.status(200).json(result);
};

const getCommentController = async (req, res) => {
  const {id}  = req.params;
  console.log(id);
  const result = await getCommentService(id);
  return res.status(200).json(result);
}
module.exports = {
  getStoreController,
  getStoreDetailController,
  getStoreByNameController,
  createCommentController,
  reactController,
  getCommentController,
};
