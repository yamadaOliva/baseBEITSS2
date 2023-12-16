import express from "express";
import authController from "../controller/authController.js";
import {
  getStoreController,
  getStoreDetailController,
  getStoreByNameController,
  createCommentController,
  reactController,
  getCommentController,
  getListCommentByStoreIdController,
  createReactionController,
} from "../controller/storeController.js";
import { getNotificationsController } from '../controller/notificationController.js'
const router = express.Router();

const initAPI = (app) => {
  router.get("/", (req, res) => {
    console.log(req.body);
    return res.status(200).json(req.body);
  });
  router.post("/register", authController.registerController);
  router.post("/login", authController.loginController);
  router.get("/store/:id", getStoreDetailController);
  router.get("/store", getStoreController);
  router.get("/store/search/:name", getStoreByNameController);
  router.post("/store/:id/comment", createCommentController);
  router.post("/store/comment/react/:id", reactController);
  router.get("/store/comment/:id", getCommentController);
  router.get("/store/:id/comment", getListCommentByStoreIdController);
  router.get("/notification", getNotificationsController)
  router.post(
    "/store/:storeId/comment/:commentId/reaction",
    createReactionController
  );
  return app.use("/api/v1", router);
};

export default initAPI;
