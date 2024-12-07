const userModel = require("../model/user.model");

module.exports.createUser = ({firstName,lastName,email,password})=>{
    if(!firstName || !email || !password){
        throw new Error("All fields are required")
    }

    const user = userModel.create({
        fullName : {
            firstName,lastName
        },
        email,
        password
    })

    return user;
}