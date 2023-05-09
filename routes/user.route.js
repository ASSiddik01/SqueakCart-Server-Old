const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");
const userMiddleware = require("../middleware/userMiddleware");

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
  .get(
    userMiddleware.authMiddleware,
    userMiddleware.isAdmin,
    userControllers.getUser
  )
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
  .patch(
    userMiddleware.authMiddleware,
    userMiddleware.isAdmin,
    userControllers.blockUser
  );

router
  .route("/unblock-user/:id")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .patch(
    userMiddleware.authMiddleware,
    userMiddleware.isAdmin,
    userControllers.unblockUser
  );

module.exports = router;
