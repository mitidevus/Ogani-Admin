const express = require("express");
const router = express.Router();

const productController = require("./productController");

router.get("/", productController.list_product);

module.exports = router;
