const User = require("../models/user.schema");

// Save User Service
exports.saveUserService = async (reqData) => {
  const { email } = reqData;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    const data = new User(reqData);
    const result = await data.save();
    // const result = await User.create(reqData);
    return result;
  } else {
    const result = false;
    return result;
  }
};
