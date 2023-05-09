const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");

router
  .route("/register")
  /**
   * @api {post} /register
   * @apiDescription save user
   * @apiPermission all
   */
  .post(userControllers.saveUser);

module.exports = router;
