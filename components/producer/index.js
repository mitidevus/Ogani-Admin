const express = require("express");
const router = express.Router();

const producerController = require("./producerController");

router.get("/", producerController.list_producer);

module.exports = router;
