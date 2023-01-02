const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const accountController = require("./accountController");

router.get("/", auth, accountController.list_accounts);

module.exports = router;
