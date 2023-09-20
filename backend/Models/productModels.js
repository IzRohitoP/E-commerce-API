const mongoose = require("mongoose");
const User = require("../Models/user");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the Product Name"],
  },
  description: {
    type: String,
    required: [true, "please enter the Product Description"],
  },
  price: {
    type: Number,
    required: [true, "please enter the Product Price"],
    maxLength: [8, "price canot exceed the 8 character"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  Category: {
    type: String,
    required: [true, "Please enter the product category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter the product Stock"],
    maxLength: [4, "stock canot exceed 4 characters"],
    default: 1,
  },
  numofReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    require: true,
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
