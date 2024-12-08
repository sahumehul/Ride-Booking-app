const mongoose =require("mongoose");


const blacklistTokenSchema = mongoose.Schema({
    token :{
        type: String,
        required:true,
        unique:true
    },
    createdAt :{
        type: Date,
        default: Date.now,
        expires : 86400
    }
})

const blackListModel = mongoose.model("blackListToken",blacklistTokenSchema);

module.exports = blackListModel