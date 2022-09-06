import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"c"
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Users"
    },
    message:{
        type:String
    }
}, {timestamps:true})

const MessageModel = mongoose.model("Messages", MessageSchema)

export default MessageModel
