const {
  createCouponService,
  getCouponsService,
  getCouponService,
  updateCouponService,
  deleteCouponService,
} = require("../services/coupon.services");

// create brand
exports.createCoupon = async (req, res, next) => {
  try {
    const result = await createCouponService(req.body);
    res.status(200).json({
      success: true,
      message: `Coupon create successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Coupon create failed`,
      error: error.message,
    });
  }
};

// get brands
exports.getCoupons = async (req, res, next) => {
  try {
    const result = await getCouponsService();
    res.status(200).json({
      success: true,
      message: `Coupons get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Coupons get failed`,
      error: error.message,
    });
  }
};

// get brand
exports.getCoupon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getCouponService(id);
    res.status(200).json({
      success: true,
      message: `Coupon get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Coupon get failed`,
      error: error.message,
    });
  }
};

// update brand
exports.updateCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateCouponService(id, req.body);
    res.status(200).json({
      success: true,
      message: `Coupon update successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Coupon update failed`,
      error: error.message,
    });
  }
};

// delete brand
exports.deleteCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteCouponService(id);
    res.status(200).json({
      success: true,
      message: `Coupon delete successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Coupon delete failed`,
      error: error.message,
    });
  }
};
