const express = require("express");
const router = express.Router();
const brandControllers = require("../controllers/brand.controller");
const userMiddleware = require("../middleware/userMiddleware");

router
  .route("/")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .post(userMiddleware.authMiddleware, brandControllers.createBrand)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(brandControllers.getBrands);

router
  .route("/:id")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(userMiddleware.authMiddleware, brandControllers.getBrand)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(userMiddleware.authMiddleware, brandControllers.updateBrand)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .delete(userMiddleware.authMiddleware, brandControllers.deleteBrand);

module.exports = router;
