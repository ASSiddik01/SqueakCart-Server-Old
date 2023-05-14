const express = require("express");
const router = express.Router();
const contactControllers = require("../controllers/contact.controller");
const userMiddleware = require("../middleware/userMiddleware");

router
  .route("/")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .post(userMiddleware.authMiddleware, contactControllers.createContact)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(contactControllers.getContacts);

router
  .route("/:id")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .get(userMiddleware.authMiddleware, contactControllers.getContact)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .patch(userMiddleware.authMiddleware, contactControllers.updateContact)
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .delete(userMiddleware.authMiddleware, contactControllers.deleteContact);

module.exports = router;
