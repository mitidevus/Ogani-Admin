const express = require("express");
const router = express.Router();

const categoryController = require("./categoryController");

router.get("/", categoryController.list_category);

router.get("/add", categoryController.show_add_category);
router.post("/add", categoryController.add_category);

router.get("/edit/:id", categoryController.show_edit_category);
router.post("/edit", categoryController.edit_category);

module.exports = router;
