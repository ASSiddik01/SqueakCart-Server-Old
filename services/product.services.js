const Product = require("../models/product.schema");
const User = require("../models/user.schema");
const slugify = require("slugify");
const {
  cloudInaryUploadImg,
  cloudInaryDeleteImg,
} = require("../utils/cloudinary");
const fs = require("fs");

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
  const { limit = 0, page = 1, sort, fields } = reqData;
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
    { $inc: { view: 1 } },
    { new: true }
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

// add to wishlist service
exports.addToWishListService = async (id, productId) => {
  const user = await User.findById(id);
  const alreadyAdded = user.wishlist.find(
    (id) => id.toString() === productId.toString()
  );
  if (alreadyAdded) {
    let user = await User.findByIdAndUpdate(
      id,
      {
        $pull: { wishlist: productId },
      },
      {
        new: true,
      }
    );
    return user;
  } else {
    let user = await User.findByIdAndUpdate(
      id,
      {
        $push: { wishlist: productId },
      },
      {
        new: true,
      }
    );
    return user;
  }
};

// rating service
exports.ratingService = async (id, star, comment, productId) => {
  const product = await Product.findById(productId);
  let aleardyRated = product.ratings.find(
    (userId) => userId.postedby.toString() === id.toString()
  );
  // individuals rating handle
  if (aleardyRated) {
    const updateRating = await Product.updateOne(
      {
        ratings: { $elemMatch: aleardyRated },
      },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      },
      {
        new: true,
      }
    );
  } else {
    const rateProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $push: {
          ratings: {
            star: star,
            comment: comment,
            postedby: id,
          },
        },
      },
      {
        new: true,
      }
    );
  }

  // handle total rating
  const getAllRatings = await Product.findById(productId);
  let totalRatting = getAllRatings.ratings.length;
  let ratingSum = getAllRatings.ratings
    .map((item) => item.star)
    .reduce((previous, current) => previous + current, 0);
  let actualRating = Math.round(ratingSum / totalRatting);
  let ratedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      totalrating: actualRating,
    },
    {
      new: true,
    }
  );

  return ratedProduct;
};

// product image upload service
exports.productImageUploadService = async (files) => {
  const uploader = (path) => cloudInaryUploadImg(path, "images");
  const urls = [];
  for (const file of files) {
    const { path } = file;
    let newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }

  const images = urls?.map((file) => {
    return file;
  });

  // const findProduct = await Product.findByIdAndUpdate(
  //   id,
  //   {
  //     images: urls?.map((file) => {
  //       return file;
  //     }),
  //   },
  //   {
  //     new: true,
  //   }
  // );

  return images;
};

// product image upload service
exports.productImageDeleteService = async (id, files) => {
  const deleted = await cloudInaryDeleteImg(id, "images");
  return deleted;
};
