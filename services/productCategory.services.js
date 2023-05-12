const porductCategory = require("../models/productCategory.schema");

// create product category service
exports.createProductCategoryService = async (category) => {
  const savedCategory = await porductCategory.create(category);
  return savedCategory;
};

// get product categories service
exports.getProductCategoriesService = async () => {
  const categories = await porductCategory.find();
  return categories;
};

// get product category service
exports.getProductCategoryService = async (id) => {
  const category = await porductCategory.findById(id);
  return category;
};

// update product categories service
exports.updateProductCategoryService = async (id, reqData) => {
  const updateCategory = await porductCategory.findByIdAndUpdate(id, reqData, {
    new: true,
  });
  return updateCategory;
};

// delete product categories service
exports.deleteProductCategoryService = async (id) => {
  const deleteCategory = await porductCategory.findByIdAndDelete(id);
  return deleteCategory;
};
