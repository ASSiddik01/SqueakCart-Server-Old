const {
  createBrandService,
  getBrandsService,
  getBrandService,
  updateBrandService,
  deleteBrandService,
} = require("../services/brand.services");

// create brand
exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      success: true,
      message: `Brand create successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Brand create failed`,
      error: error.message,
    });
  }
};

// get brands
exports.getBrands = async (req, res, next) => {
  try {
    const result = await getBrandsService();
    res.status(200).json({
      success: true,
      message: `Brands get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Brands get failed`,
      error: error.message,
    });
  }
};

// get brand
exports.getBrand = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getBrandService(id);
    res.status(200).json({
      success: true,
      message: `Brand get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Brand get failed`,
      error: error.message,
    });
  }
};

// update brand
exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateBrandService(id, req.body);
    res.status(200).json({
      success: true,
      message: `Brand update successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Brand update failed`,
      error: error.message,
    });
  }
};

// delete brand
exports.deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteBrandService(id);
    res.status(200).json({
      success: true,
      message: `Brand delete successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Brand delete failed`,
      error: error.message,
    });
  }
};
