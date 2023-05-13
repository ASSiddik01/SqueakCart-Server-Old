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
