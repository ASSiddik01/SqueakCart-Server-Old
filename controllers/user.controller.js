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
  updatePasswordService,
  forgetPasswordService,
  resetPasswordService,
  getWishListService,
  userCartService,
  getUserCartService,
  emptyCartService,
  applyCouponService,
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

// update password
exports.updatePassword = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { password } = req.body;
    console.log(_id, password);
    const result = await updatePasswordService(_id, password);
    if (!result) {
      res.status(404).json({
        success: false,
        message: `Refresh token not found`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Password update successfully`,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Password update failed`,
      error: error.message,
    });
  }
};

// reset password token
exports.forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await forgetPasswordService(email);
    if (!result) {
      res.status(404).json({
        success: false,
        message: `User not found`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Password reset token successfully`,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Password reset token failed`,
      error: error.message,
    });
  }
};

// reset password
exports.resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    const result = await resetPasswordService(token, password);
    if (!result) {
      res.status(404).json({
        success: false,
        message: `Token exprire, Please try again later`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Password reset successfully`,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Password reset failed`,
      error: error.message,
    });
  }
};

// get wish list
exports.getWishList = async (req, res, next) => {
  try {
    const { _id } = req?.user;
    const result = await getWishListService(_id);
    res.status(200).json({
      success: true,
      message: `Wish list get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Wish list get failed`,
      error: error.message,
    });
  }
};

// user cart
exports.userCart = async (req, res, next) => {
  try {
    const { _id } = req?.user;
    const { cart } = req.body;
    const result = await userCartService(_id, cart);
    res.status(200).json({
      success: true,
      message: `Cart save successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Cart save failed`,
      error: error.message,
    });
  }
};

// get user cart
exports.getUserCart = async (req, res, next) => {
  try {
    const { _id } = req?.user;
    const result = await getUserCartService(_id);
    res.status(200).json({
      success: true,
      message: `Cart get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Cart get failed`,
      error: error.message,
    });
  }
};

// get user cart
exports.emptyCart = async (req, res, next) => {
  try {
    const { _id } = req?.user;
    const result = await emptyCartService(_id);
    res.status(200).json({
      success: true,
      message: `Cart empty successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Cart empty failed`,
      error: error.message,
    });
  }
};

// apply coupon
exports.applyCoupon = async (req, res, next) => {
  try {
    const { _id } = req?.user;
    const { coupon } = req?.body;
    const result = await applyCouponService(_id, coupon);
    res.status(200).json({
      success: true,
      message: `Coupon applied successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Coupon applied failed`,
      error: error.message,
    });
  }
};
