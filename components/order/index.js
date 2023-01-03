const express = require("express");
const router = express.Router();

const orderController = require("./orderController");

router.get("/", orderController.list_orders);

router.get("/:id", orderController.detail_order);

router.get("/accept/:id", orderController.accept_order);

router.get("/pending/:id", orderController.pending_order);

router.get("/cancel/:id", orderController.cancel_order);

module.exports = router;
