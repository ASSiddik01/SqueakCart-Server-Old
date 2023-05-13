const Coupon = require("../models/coupon.schema");

// create coupon
exports.createCouponService = async (coupon) => {
  const savedCoupon = await Coupon.create(coupon);
  return savedCoupon;
};

// get coupons
exports.getCouponsService = async () => {
  const coupons = await Coupon.find();
  return coupons;
};

// get a coupon
exports.getCouponService = async (id) => {
  const coupon = await Coupon.findById(id);
  return coupon;
};

// update coupon
exports.updateCouponService = async (id, coupon) => {
  const updateCoupon = await Coupon.findByIdAndUpdate(id, coupon, {
    new: true,
  });
  return updateCoupon;
};

// delete coupon
exports.deleteCouponService = async (id) => {
  const deleteCoupon = await Coupon.findByIdAndDelete(id, {
    new: true,
  });
  return deleteCoupon;
};
