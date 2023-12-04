import jwt from "jsonwebtoken";
require("dotenv").config();

const createToken = (
  user = {
    name: "vietanh",
    email: "test",
  }
) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const checkIsLogin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      EC: 401,
      data: null,
      message: "Unauthorized",
    });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      EC: 401,
      data: null,
      message: "Unauthorized",
    });
  }
};

module.exports = {
  createToken,
    verifyToken,
    checkIsLogin
};
