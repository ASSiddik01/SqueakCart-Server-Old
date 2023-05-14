const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");
const { authMiddleware, isAdmin } = require("../middleware/userMiddleware");

router
  .route("/register")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .post(userControllers.saveUser);

router
  .route("/login")
  /**
   * @api {post} /login
   * @apiDescription get user info
   * @apiPermission all
   */
  .post(userControllers.loginUser);

router
  .route("/refresh")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .get(userControllers.refreshToken);

router
  .route("/wishlist")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .get(authMiddleware, userControllers.getWishList);

router
  .route("/empty-cart")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .delete(authMiddleware, userControllers.emptyCart);

router
  .route("/cart")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .post(authMiddleware, userControllers.userCart)
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .get(authMiddleware, userControllers.getUserCart);

router
  .route("/applycoupon")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .post(authMiddleware, userControllers.applyCoupon);

router
  .route("/cash-order")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .post(authMiddleware, userControllers.createOrder);

router
  .route("/all-orders")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .get(authMiddleware, userControllers.getAllOrders);

router
  .route("/get-order")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .get(authMiddleware, userControllers.getOrders);

router
  .route("/order-by-id")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .get(authMiddleware, userControllers.getOrderByUserId);

router
  .route("/update-order/:id")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .patch(authMiddleware, userControllers.updateOrdersStatus);

router
  .route("/logout")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .get(userControllers.logoutUser);

router
  .route("/password")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .patch(authMiddleware, userControllers.updatePassword)
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .post(userControllers.forgetPassword);

router
  .route("/reset-password/:token")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .patch(userControllers.resetPassword);

router
  .route("/")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .get(userControllers.getAllUsers);

router
  .route("/:id")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .get(authMiddleware, isAdmin, userControllers.getUser)
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .delete(userControllers.deleteUser)
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .patch(userControllers.updateUser);

router
  .route("/block-user/:id")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .patch(authMiddleware, isAdmin, userControllers.blockUser);

router
  .route("/unblock-user/:id")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .patch(authMiddleware, isAdmin, userControllers.unblockUser);

module.exports = router;
