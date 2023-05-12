const {
  createBlogCategoryService,
  getBlogCategoriesService,
  updateBlogCategoryService,
  deleteBlogCategoryService,
  getBlogCategoryService,
} = require("../services/blogCategory.services");

// create blog category
exports.createBlogCategory = async (req, res, next) => {
  try {
    const result = await createBlogCategoryService(req.body);
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

// get blog categories
exports.getBlogCategories = async (req, res, next) => {
  try {
    const result = await getBlogCategoriesService();
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

// get blog category
exports.getBlogCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getBlogCategoryService(id);
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

// update blog category
exports.updateBlogCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateBlogCategoryService(id, req.body);
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

// delete blog category
exports.deleteBlogCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteBlogCategoryService(id);
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
