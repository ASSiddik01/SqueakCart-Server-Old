const express = require("express");
const router = express.Router();
const blogControllers = require("../controllers/blog.controller");
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
    blogControllers.createBlog
  )
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(blogControllers.getBlogs);

router
  .route("/likes")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(userMiddleware.authMiddleware, blogControllers.likeBlog);

router
  .route("/dislikes")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(userMiddleware.authMiddleware, blogControllers.dislikeBlog);

router
  .route("/:id")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(blogControllers.getBlog)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(
    userMiddleware.authMiddleware,
    userMiddleware.isAdmin,
    blogControllers.updateBlog
  )
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .delete(
    userMiddleware.authMiddleware,
    userMiddleware.isAdmin,
    blogControllers.deleteBlog
  );

module.exports = router;
