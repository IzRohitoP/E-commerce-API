const Product = require("../Models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middlewares/catchAsyncerror");
const Apifeatures = require("../utils/apifeatures");

//Create Product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  //while creating object saving his id for , who is creating the product for information purpose
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//GEt all product
exports.getallproduct = catchAsyncError(async (req, res, next) => {
  //Setting the output  in per page
  const resultPerPage = 5;
  const ProductCount = await Product.countDocuments();
  const apifeatures = new Apifeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apifeatures.query;

  res.status(200).json({
    success: true,
    message: "All Product fetched",
    products,
    ProductCount,
  });
});

//Get product details  by id
exports.getproductdetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product found successfully",
    product,
  });
});

//Update Product ==Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not Found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Updated Successfully",
    product,
  });
});

//Delting Product == Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // await product.remove(); //this not working
    await Product.deleteOne({ _id: product._id }); // Use deleteOne() method

    return res.status(200).json({
      success: true,
      message: "Product Successfully Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product",
      error: error.message,
    });
  }
});
