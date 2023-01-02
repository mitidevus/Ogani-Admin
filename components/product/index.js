const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const productController = require("./productController");

router.get("/", auth, productController.list_product);

module.exports = router;
