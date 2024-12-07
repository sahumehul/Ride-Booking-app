const express =require("express");
const router = express.Router();
const {body } = require("express-validator");
const userController = require("../controllers/user.controller")


router.post("/register",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName").isLength({min : 3}).withMessage("First Name should be at least 3 characters"),
    body("password").isLength({min : 6}).withMessage("password should be atleast 6 characters")
],
userController.registerUser)

module.exports = router;