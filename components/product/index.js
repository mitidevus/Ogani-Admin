const express = require("express");
const router = express.Router();

const productController = require("./productController");

router.get("/", productController.list_product);

router.get("/add", productController.add_product_get);

router.post("/add", productController.add_product_post);

module.exports = router;

