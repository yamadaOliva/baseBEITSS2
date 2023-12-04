import express from 'express';
import  authController from '../controller/authController.js';
const router = express.Router();

const initAPI = (app) => {
    router.get("/", (req, res) => {
        console.log(req.body);
        return res.status(200).json(req.body);
    });
    router.post('/register', authController.registerController)
    router.post('/login', authController.loginController)
    return app.use("/api/v1", router);
}

export default initAPI;