const User = require("../models/user.schema");
const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "UnAuthorized access" });
  }
  if (authHeader?.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded?.id);
        req.user = user;
        req.decoded = decoded;
        next();
      }
    } catch (error) {
      return res
        .status(403)
        .send({ message: "Token invalid. Please login again" });
    }
  }
};

exports.isAdmin = async (req, res, next) => {
  const requester = req?.user?.role;
  if (requester === "admin") {
    next();
  } else {
    res
      .status(403)
      .send({ message: `${req?.user?.lastname}, You have no access key` });
  }
};
