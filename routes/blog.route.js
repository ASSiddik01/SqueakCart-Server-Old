const express = require("express");
const router = express.Router();
const blogControllers = require("../controllers/blog.controller");
const { authMiddleware, isAdmin } = require("../middleware/userMiddleware");
const { uploadFile, blogImageResize } = require("../middleware/uploadImages");

router
  .route("/")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .post(authMiddleware, isAdmin, blogControllers.createBlog)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(blogControllers.getBlogs);

router
  .route("/upload-img")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .post(
    authMiddleware,
    isAdmin,
    uploadFile.array("images", 5),
    blogImageResize,
    blogControllers.uploadImages
  );

router
  .route("/delete-img/:id")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .delete(
    authMiddleware,
    isAdmin,
    uploadFile.array("images", 10),
    blogImageResize,
    blogControllers.deleteImages
  );

router
  .route("/likes")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(authMiddleware, blogControllers.likeBlog);

router
  .route("/dislikes")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(authMiddleware, blogControllers.dislikeBlog);

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
  .patch(authMiddleware, isAdmin, blogControllers.updateBlog)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .delete(authMiddleware, isAdmin, blogControllers.deleteBlog);

module.exports = router;
