import mongoose from "mongoose";

const VerifyToken = new mongoose.Schema({
    userId:String,
    token: {
        type:String,
        unique:true
    },
    expiresAt: {
        type: Date, default: Date.now, index: { expires: 1 }
    }
})

const verifyToken = mongoose.model("AuthToken", VerifyToken)

export default verifyToken
