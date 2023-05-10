const User = require("../models/user.schema");
const { generateRefreshToken } = require("../utils/refreshToken");
const { generateToken } = require("../utils/token");
const jwt = require("jsonwebtoken");

// Save User Service
exports.saveUserService = async (reqData) => {
  const { email } = reqData;
  const findUser = await User.findOne({ email }).select("-password");
  if (!findUser) {
    // const data = new User(reqData);
    // const result = await data.save();
    const result = await User.create(reqData);
    return result;
  } else {
    const result = false;
    return result;
  }
};

// Login User Service
exports.loginUserService = async (reqData) => {
  const { email, password } = reqData;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser?._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    const user = {
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      phone: findUser?.phone,
      role: findUser?.role,
      token: generateToken(findUser?._id),
      refreshToken: refreshToken,
    };
    return user;
  } else {
    throw new Error("Invalid Credentials");
  }
  return findUser;
};

// Get all user service
exports.getUsersService = async () => {
  const users = await User.find({}, "-password");
  return users;
};

// Get user service
exports.getUserService = async (reqData) => {
  const { id } = reqData;
  const user = await User.findById(id, "-password");
  return user;
};

// delete user service
exports.deleteUserService = async (reqData) => {
  const { id } = reqData;
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

// update user service
exports.updateUserService = async (id, reqData) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      firstname: reqData?.firstname,
      lastname: reqData?.lastname,
      email: reqData?.email,
      phone: reqData?.phone,
    },
    {
      new: true,
    }
  );
  return updatedUser;
};

// block user service
exports.blockUserService = async (id, reqData) => {
  const blockedUser = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {
      new: true,
    }
  );
  return blockedUser;
};

// unblock user service
exports.unblockUserService = async (id, reqData) => {
  const unblockedUser = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    {
      new: true,
    }
  );
  return unblockedUser;
};

// refresh token service
exports.refreshTokenService = async (cookie) => {
  if (!cookie?.refreshToken) {
    return false;
  } else {
    const refreshToken = cookie?.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      throw new Error();
    }
    const accessToken = jwt.verify(
      refreshToken,
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err || user._id === decoded.id) {
          throw new Error();
        }
        const accessToken = generateToken(user._id);
        return accessToken;
      }
    );
    return { accessToken: accessToken };
  }
};

// user logout service
exports.logoutService = async (cookie) => {
  if (!cookie?.refreshToken) {
    return false;
  } else {
    const refreshToken = cookie?.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      throw new Error();
    }
    const logoutUser = await User.findOneAndUpdate(
      { refreshToken },
      {
        refreshToken: "",
      }
    );
    return logoutUser;
  }
};
