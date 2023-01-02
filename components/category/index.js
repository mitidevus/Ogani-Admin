const express = require("express");
const router = express.Router();

const categoryController = require("./categoryController");

router.get("/", categoryController.list_category);

router.get("/add", categoryController.show_add_category);
router.post("/add", categoryController.add_category);

module.exports = router;
