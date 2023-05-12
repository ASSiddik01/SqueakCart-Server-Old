const blogCategory = require("../models/blogCategory.schema");

// create blog category service
exports.createBlogCategoryService = async (category) => {
  const savedCategory = await blogCategory.create(category);
  return savedCategory;
};

// get blog categories service
exports.getBlogCategoriesService = async () => {
  const categories = await blogCategory.find();
  return categories;
};

// get blog category service
exports.getBlogCategoryService = async (id) => {
  const category = await blogCategory.findById(id);
  return category;
};

// update blog categories service
exports.updateBlogCategoryService = async (id, reqData) => {
  const updateCategory = await blogCategory.findByIdAndUpdate(id, reqData, {
    new: true,
  });
  return updateCategory;
};

// delete blog categories service
exports.deleteBlogCategoryService = async (id) => {
  const deleteCategory = await blogCategory.findByIdAndDelete(id);
  return deleteCategory;
};
