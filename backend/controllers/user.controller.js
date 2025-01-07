const userModel = require("../model/user.model");
const {validationResult} = require("express-validator");
const userService = require("../services/user.service")
const blackListTokenModel = require("../model/blackListToken.model")

module.exports.registerUser = async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors : error.array()})
    }


    
    const {fullName, email, password} = req.body
    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstName : fullName.firstName,
        lastName: fullName.lastName,
        email,
        password : hashedPassword
    })

    const token =await  user.generateAuthToken();

    res.status(201).json({token,user})

}

module.exports.loginUser =async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({message : "Invalid email or password"})
    }

    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({message : "Invalid email or password"})
    }

    const token = await user.generateAuthToken();
    res.cookie("token",token)
    res.status(200).json({token,user})
}

module.exports.getUserProfile =async(req,res)=>{
    return await res.status(200).json(req.user)
}

// module.exports.logoutUser = async(req,res,next)=>{
    
//     const token = req.cookies.token || req.headers.authorization.split(" ")[1];
//     await blackListTokenModel.create({token})
//     res.clearCookie("token");
//     res.status(200).json({message : "logged out"})
// }

module.exports.logoutUser = async (req, res) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.token || (req.headers.authorization?.split(" ")[1]);

        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        // Check if the token is already blacklisted
        const existingToken = await blackListTokenModel.findOne({ token });

        if (!existingToken) {
            // Blacklist the token if it doesn't exist
            await blackListTokenModel.create({ token });
        }

        // Clear the token cookie
        res.clearCookie('token', { httpOnly: true, secure: true });

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error('Error during user logout:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

