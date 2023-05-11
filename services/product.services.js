const Product = require("../models/product.schema");
const slugify = require("slugify");

// save product service
exports.createProductService = async (reqData) => {
  if (reqData?.title) {
    reqData.slug = slugify(reqData?.title);
  }
  const result = await Product.create(reqData);
  return result;
};

// get all product service
exports.getProductsService = async (reqData) => {
  // Query Handle
  let filters = { ...reqData };
  const excludeFields = ["sort", "page", "limit", "fields"];
  excludeFields.forEach((filter) => delete filters[filter]);
  const { limit = 12, page = 1, sort, fields } = reqData;
  const queries = {};
  // sorting
  if (sort) {
    const result = sort.split(",").join(" ");
    console.log(result);
    queries.sortBy = result;
  }
  // limiting
  if (fields) {
    const result = fields.split(",").join(" ");
    queries.fields = result;
  }

  // Operator handle
  let filtersString = JSON.stringify(filters);
  filtersString = filtersString.replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );
  filters = JSON.parse(filtersString);

  // Pagination
  const total = await Product.countDocuments(filters);
  const pageCount = Math.ceil(total / limit);

  const result = await Product.find(filters)
    .skip(+(page - 1) * limit)
    .limit(+limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  return { total, pageCount, result };
};

// get a product service
exports.getProductService = async (id) => {
  const result = await Product.findByIdAndUpdate(
    { _id: id },
    { $inc: { view: 1 } }
  );
  return result;
};

// update product service
exports.updateProductService = async (id, reqData) => {
  if (reqData?.title) {
    reqData.slug = slugify(reqData?.title);
  }
  const result = await Product.findOneAndUpdate({ _id: id }, reqData, {
    new: true,
  });
  return result;
};

// delete product service
exports.deleteProductService = async (id) => {
  const result = await Product.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  );
  return result;
};
