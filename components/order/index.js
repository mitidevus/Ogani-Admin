const express = require("express");
const router = express.Router();

const orderController = require("./orderController");

router.get("/", orderController.list_orders);

module.exports = router;
