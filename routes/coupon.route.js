const express = require("express");
const router = express.Router();
const couponControllers = require("../controllers/coupon.controller");
const userMiddleware = require("../middleware/userMiddleware");

router
  .route("/")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .post(
    userMiddleware.authMiddleware,
    userMiddleware.isAdmin,
    couponControllers.createCoupon
  )
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(couponControllers.getCoupons);

router
  .route("/:id")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(userMiddleware.authMiddleware, couponControllers.getCoupon)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(userMiddleware.authMiddleware, couponControllers.updateCoupon)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .delete(userMiddleware.authMiddleware, couponControllers.deleteCoupon);

module.exports = router;
