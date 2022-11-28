const express = require("express");
const router = express.Router();

const accountController = require("./accountController");

router.get("/", accountController.list_accounts);

module.exports = router;
