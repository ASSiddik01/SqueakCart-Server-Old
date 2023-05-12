const express = require("express");
const router = express.Router();
const productCategoryControllers = require("../controllers/productCategory.controller");
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
    productCategoryControllers.createProductCategory
  )
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(productCategoryControllers.getProductCategories);

router
  .route("/:id")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(
    userMiddleware.authMiddleware,
    productCategoryControllers.getProductCategory
  )
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(
    userMiddleware.authMiddleware,
    productCategoryControllers.updateProductCategory
  )
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .delete(
    userMiddleware.authMiddleware,
    productCategoryControllers.deleteProductCategory
  );

module.exports = router;
