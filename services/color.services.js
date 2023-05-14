const Color = require("../models/color.schema");

// create blog brand service
exports.createColorService = async (brand) => {
  const savedColor = await Color.create(brand);
  return savedColor;
};

// get blog brands service
exports.getColorsService = async () => {
  const brands = await Color.find();
  return brands;
};

// get blog brand service
exports.getColorService = async (id) => {
  const brand = await Color.findById(id);
  return brand;
};

// update blog categories service
exports.updateColorService = async (id, reqData) => {
  const updateColor = await Color.findByIdAndUpdate(id, reqData, {
    new: true,
  });
  return updateColor;
};

// delete blog categories service
exports.deleteColorService = async (id) => {
  const deleteColor = await Color.findByIdAndDelete(id);
  return deleteColor;
};
