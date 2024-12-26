const mongoose =require('mongoose');

const rideSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require: true,
    },
    captain:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Captain'
    },
    pickup:{
        type: String,
        required: true,
    },
    destination:{
        type:String,
        required: true
    },
    fare:{
        type: Number,
        required:true
    },
    status:{
        type:String,
        enum: ["pending","accepted","ongoing","completed","cancelled"],
        default : 'pending'
    },
    distance:{
        type: Number
    },
    duration: {
        type: Number
    },
    paymentId:{
        type: String
    },
    orderId:{
        type: String
    },
    signature:{
        type: String
    },
    otp :{
        type : Number,
        required: true,
        select : false
    }
})

module.exports = new mongoose.model('ride',rideSchema)