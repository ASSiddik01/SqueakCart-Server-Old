const express = require("express");
const router = express.Router();
const colorControllers = require("../controllers/color.controller");
const userMiddleware = require("../middleware/userMiddleware");

router
  .route("/")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .post(userMiddleware.authMiddleware, colorControllers.createColor)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(colorControllers.getColors);

router
  .route("/:id")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(userMiddleware.authMiddleware, colorControllers.getColor)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(userMiddleware.authMiddleware, colorControllers.updateColor)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .delete(userMiddleware.authMiddleware, colorControllers.deleteColor);

module.exports = router;
