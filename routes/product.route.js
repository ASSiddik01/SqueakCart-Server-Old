const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product.controller");
const { authMiddleware, isAdmin } = require("../middleware/userMiddleware");
const {
  uploadFile,
  productImageResize,
} = require("../middleware/uploadImages");

router
  .route("/wishlist")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(authMiddleware, productControllers.addToWishList);

router
  .route("/rating")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(authMiddleware, productControllers.rating);

router
  .route("/")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .post(authMiddleware, isAdmin, productControllers.createProduct)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(productControllers.getProducts);

router
  .route("/upload/:id")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(
    authMiddleware,
    isAdmin,
    uploadFile.array("images", 10),
    productImageResize,
    productControllers.uploadImages
  );

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
  .patch(authMiddleware, isAdmin, productControllers.updateProduct)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .delete(authMiddleware, isAdmin, productControllers.deleteProduct);

module.exports = router;
