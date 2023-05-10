const mongoose = require("mongoose");

exports.validateMongoDbId = (_id) => {
  const isValid = mongoose.Types.ObjectId.isValid(_id);
  console.log(isValid);
  if (!isValid) {
    return { message: `${id}, this is not valid` };
  }
};
