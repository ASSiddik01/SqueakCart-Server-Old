const { saveUserService } = require("../services/user.services");

// Save API
exports.saveUser = async (req, res, next) => {
  try {
    // Save
    const reqData = req.body;
    const result = await saveUserService(reqData);
    if (!result) {
      res.status(409).json({
        success: false,
        message: `User already exist`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Account create successfully`,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Account create failed`,
      error: error.message,
    });
  }
};
