const BlogCategory = require("../models/blogCategory.schema");

// create blog category service
exports.createBlogCategoryService = async (category) => {
  const savedCategory = await BlogCategory.create(category);
  return savedCategory;
};

// get blog categories service
exports.getBlogCategoriesService = async () => {
  const categories = await BlogCategory.find();
  return categories;
};

// get blog category service
exports.getBlogCategoryService = async (id) => {
  const category = await BlogCategory.findById(id);
  return category;
};

// update blog categories service
exports.updateBlogCategoryService = async (id, reqData) => {
  const updateCategory = await BlogCategory.findByIdAndUpdate(id, reqData, {
    new: true,
  });
  return updateCategory;
};

// delete blog categories service
exports.deleteBlogCategoryService = async (id) => {
  const deleteCategory = await BlogCategory.findByIdAndDelete(id);
  return deleteCategory;
};
