const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const productController = require("./productController");

router.get("/", auth, productController.list_product);

router.get("/add", productController.add_product_get);

router.post("/add", productController.add_product_post);

router.get("/update/:id", productController.update_product_get);

router.post("/update/:id", productController.update_product_post);

router.get("/delete/:id", productController.delete_product);

module.exports = router;

