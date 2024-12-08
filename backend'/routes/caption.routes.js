const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const captainController = require("../controllers/captain.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/register",[
    body('email').isEmail().withMessage("Invalid Email"),
    body("fullName.firstName").isLength({min:3}).withMessage("first name should be at least 3 character long"),
    body("password").isLength({min: 6}).withMessage("password should be atleast 6 character long"),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.numPlate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
],captainController.registerCaptain)


router.post("/login",[
    body('email').isEmail().withMessage("Invalid Email"),
    body("password").isLength({min: 6}).withMessage("password should be atleast 6 character long")
],captainController.loginCaptain)

router.get("/profile",authMiddleware.authCaption,captainController.getCaptainProfile)
router.get("/logout",authMiddleware.authCaption,captainController.logoutCaptain)

module.exports = router;