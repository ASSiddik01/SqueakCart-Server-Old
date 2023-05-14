const {
  createColorService,
  getColorsService,
  getColorService,
  updateColorService,
  deleteColorService,
} = require("../services/color.services");

// create brand
exports.createColor = async (req, res, next) => {
  try {
    const result = await createColorService(req.body);
    res.status(200).json({
      success: true,
      message: `Color create successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Color create failed`,
      error: error.message,
    });
  }
};

// get brands
exports.getColors = async (req, res, next) => {
  try {
    const result = await getColorsService();
    res.status(200).json({
      success: true,
      message: `Colors get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Colors get failed`,
      error: error.message,
    });
  }
};

// get brand
exports.getColor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getColorService(id);
    res.status(200).json({
      success: true,
      message: `Color get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Color get failed`,
      error: error.message,
    });
  }
};

// update brand
exports.updateColor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateColorService(id, req.body);
    res.status(200).json({
      success: true,
      message: `Color update successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Color update failed`,
      error: error.message,
    });
  }
};

// delete brand
exports.deleteColor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteColorService(id);
    res.status(200).json({
      success: true,
      message: `Color delete successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Color delete failed`,
      error: error.message,
    });
  }
};
