const express = require("express");
const router = express.Router();

const categoryController = require("./categoryController");

router.get("/", categoryController.list_category);

module.exports = router;
