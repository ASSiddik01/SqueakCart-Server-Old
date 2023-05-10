const jwt = require("jsonwebtoken");

exports.generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "7d" });
};
