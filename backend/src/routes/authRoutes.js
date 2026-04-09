const express = require("express");
const router = express.Router();//creates router instance

const { login } = require("../controllers/authController");

router.post("/login", login);

module.exports = router;