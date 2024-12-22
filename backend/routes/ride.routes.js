const express = require("express");
const router = express.Router();
const {body} = require("express-validator")
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/create"),authMiddleware.authUser,
    body('user')

module.exports = router
