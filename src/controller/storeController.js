import {
  getStore,
  getStoreDetail,
  getStoreByName,
  createCommentService,
  reactService,
  getCommentService,
  getListCommentByStoreIdService,
  createReactionService,
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
  const result = await getStoreByName(name);
  return res.status(200).json(result);
};

const createCommentController = async (req, res) => {
  const { id } = req.params;
  const comment = req.body;
  console.log(req.body);
  console.log(comment, id);
  const result = await createCommentService(id, comment);
  return res.status(200).json(result);
};

const reactController = async (req, res) => {
  const id = req.params;
  const react = req.body;
  const result = await reactService();
  return res.status(200).json(result);
};

const getCommentController = async (req, res) => {
  const { id } = req.params;
  const result = await getCommentService(id);
  return res.status(200).json(result);
};

const getListCommentByStoreIdController = async (req, res) => {
  const { id } = req.params;
  const result = await getListCommentByStoreIdService(id);
  return res.status(200).json(result);
};

const createReactionController = async (req, res) => {
  const { storeId, commentId } = req.params;
  const reaction = req.body;
  const result = await createReactionService(storeId, commentId, reaction);
  return res.status(200).json(result);
};

module.exports = {
  getStoreController,
  getStoreDetailController,
  getStoreByNameController,
  createCommentController,
  reactController,
  getCommentController,
  getListCommentByStoreIdController,
  createReactionController,
};
