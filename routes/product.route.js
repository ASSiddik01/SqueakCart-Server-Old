const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product.controller");
const userMiddleware = require("../middleware/userMiddleware");

router
  .route("/wishlist")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(userMiddleware.authMiddleware, productControllers.addToWishList);

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
    productControllers.createProduct
  )
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(productControllers.getProducts);

router
  .route("/:id")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(productControllers.getProduct)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(
    userMiddleware.authMiddleware,
    userMiddleware.isAdmin,
    productControllers.updateProduct
  )
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .delete(
    userMiddleware.authMiddleware,
    userMiddleware.isAdmin,
    productControllers.deleteProduct
  );

module.exports = router;
