const {
  saveUserService,
  loginUserService,
  getUsersService,
  getUserService,
  deleteUserService,
  updateUserService,
  blockUserService,
  unblockUserService,
  refreshTokenService,
  logoutService,
} = require("../services/user.services");

// Save API
exports.saveUser = async (req, res, next) => {
  try {
    // Save
    const reqData = req.body;
    const result = await saveUserService(reqData);
    if (!result) {
      res.status(409).json({
        success: false,
        message: `User already exist`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Account create successfully`,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Account create failed`,
      error: error.message,
    });
  }
};

// Login User
exports.loginUser = async (req, res, next) => {
  try {
    // Save
    const reqData = req.body;
    const result = await loginUserService(reqData);
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      maxAge: 168 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: `User get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `User not found`,
      error: error.message,
    });
  }
};

// user log out
exports.logoutUser = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const result = await logoutService(cookie);
    if (!result) {
      res.status(404).json({
        success: false,
        message: `Refresh token not found`,
        data: result,
      });
    } else {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      res.status(200).json({
        success: true,
        message: `User logout successfully`,
        data: result,
      });
    }
  } catch (error) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.status(400).json({
      success: false,
      message: `User logout failed`,
      error: error.message,
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await getUsersService();
    res.status(200).json({
      success: true,
      message: `Users get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Users not found`,
      error: error.message,
    });
  }
};

// Get User
exports.getUser = async (req, res, next) => {
  try {
    const result = await getUserService(req.params);
    if (!result) {
      res.status(404).json({
        success: false,
        message: `User not found`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `User get successfully`,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `User not found`,
      error: error.message,
    });
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    const result = await deleteUserService(req.params);
    if (!result) {
      res.status(404).json({
        success: false,
        message: `User not found`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `User delete successfully`,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `User delete failed`,
      error: error.message,
    });
  }
};

// update User
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateUserService(id, req.body);
    if (!result) {
      res.status(404).json({
        success: false,
        message: `User not found`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `User update successfully`,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `User update failed`,
      error: error.message,
    });
  }
};

// block User
exports.blockUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await blockUserService(id);
    if (!result) {
      res.status(404).json({
        success: false,
        message: `User not found`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `User blocked`,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `User blocked failed`,
      error: error.message,
    });
  }
};

// unblock User
exports.unblockUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await unblockUserService(id);
    if (!result) {
      res.status(404).json({
        success: false,
        message: `User not found`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `User unblocked`,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `User unblocked failed`,
      error: error.message,
    });
  }
};

// handle refresh token
exports.refreshToken = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const result = await refreshTokenService(cookie);
    if (!result) {
      res.status(404).json({
        success: false,
        message: `Refresh token not found`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Token update successfully`,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Token refresh failed`,
      error: error.message,
    });
  }
};
