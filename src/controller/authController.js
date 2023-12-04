import {registerService,loginService} from '../service/authService.js';

const registerController = async (req, res) => {
    const user = req.body;
    console.log(req.body);
    const result = await registerService(user);
    return res.status(result.EC).json(result);
}

const loginController = async (req, res) => {
    const user = req.body;
    console.log(req.body);
    const result = await loginService(user);
    return res.status(result.EC).json(result);
}

module.exports = {
    registerController,
    loginController
}