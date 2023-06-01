const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    color: {
      type: Array,
    },
    tag: {
      type: Array,
    },
    brand: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    view: {
      type: Number,
      min: [0, "View can't be less than 0"],
    },
    status: {
      type: String,
      enum: {
        values: ["available", "unavailable"],
        message: "Status can't be {VALUE}. Either available or unavailable",
      },
      default: "available",
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalrating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Methods
productSchema.pre("save", function (next) {
  if (this.view == null) {
    this.view = "0";
  }
  next();
});

productSchema.pre("save", function (next) {
  if (this.quantity == 0) {
    this.status = "unavailable";
  }
  next();
});

//Export the model
module.exports = mongoose.model("Product", productSchema);
