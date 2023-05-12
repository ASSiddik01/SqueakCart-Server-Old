const {
  createProductCategoryService,
  getProductCategoriesService,
  updateProductCategoryService,
  deleteProductCategoryService,
  getProductCategoryService,
} = require("../services/productCategory.services");

// create product category
exports.createProductCategory = async (req, res, next) => {
  try {
    const result = await createProductCategoryService(req.body);
    res.status(200).json({
      success: true,
      message: `Category create successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Category create failed`,
      error: error.message,
    });
  }
};

// get product categories
exports.getProductCategories = async (req, res, next) => {
  try {
    const result = await getProductCategoriesService();
    res.status(200).json({
      success: true,
      message: `Category get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Category get failed`,
      error: error.message,
    });
  }
};

// get product category
exports.getProductCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getProductCategoryService(id);
    res.status(200).json({
      success: true,
      message: `Category get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Category get failed`,
      error: error.message,
    });
  }
};

// update product category
exports.updateProductCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductCategoryService(id, req.body);
    res.status(200).json({
      success: true,
      message: `Category update successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Category update failed`,
      error: error.message,
    });
  }
};

// delete product category
exports.deleteProductCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductCategoryService(id);
    res.status(200).json({
      success: true,
      message: `Category delete successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Category delete failed`,
      error: error.message,
    });
  }
};
