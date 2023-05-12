const Brand = require("../models/brand.schema");

// create blog brand service
exports.createBrandService = async (brand) => {
  const savedBrand = await Brand.create(brand);
  return savedBrand;
};

// get blog brands service
exports.getBrandsService = async () => {
  const brands = await Brand.find();
  return brands;
};

// get blog brand service
exports.getBrandService = async (id) => {
  const brand = await Brand.findById(id);
  return brand;
};

// update blog categories service
exports.updateBrandService = async (id, reqData) => {
  const updateBrand = await Brand.findByIdAndUpdate(id, reqData, {
    new: true,
  });
  return updateBrand;
};

// delete blog categories service
exports.deleteBrandService = async (id) => {
  const deleteBrand = await Brand.findByIdAndDelete(id);
  return deleteBrand;
};
