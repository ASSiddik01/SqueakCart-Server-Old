const express = require("express");
const router = express.Router();
const blogCategoryControllers = require("../controllers/blogCategory.controller");
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
    blogCategoryControllers.createBlogCategory
  )
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(blogCategoryControllers.getBlogCategories);

router
  .route("/:id")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(userMiddleware.authMiddleware, blogCategoryControllers.getBlogCategory)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(
    userMiddleware.authMiddleware,
    blogCategoryControllers.updateBlogCategory
  )
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .delete(
    userMiddleware.authMiddleware,
    blogCategoryControllers.deleteBlogCategory
  );

module.exports = router;
