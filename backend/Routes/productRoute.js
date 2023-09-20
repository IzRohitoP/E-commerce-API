//Importing the required libraries
const express = require("express");
const router = express.Router();
const { isAuthenticated, AuthorizedRole } = require("../middlewares/auth");
//Destructuring all the module getallproduct
const {
  getallproduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getproductdetails,
} = require("../Controllers/productControllers");

router.route("/products").get(getallproduct);
router
  .route("/product/new")
  .post(isAuthenticated, AuthorizedRole("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticated, AuthorizedRole("admin"), updateProduct)
  .delete(isAuthenticated, AuthorizedRole("admin"), deleteProduct);
router.route("/getproductbyid/:id").get(getproductdetails);

module.exports = router;
