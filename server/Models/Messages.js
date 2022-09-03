import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    conversationID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"c"
    },
    senderID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Users"
    },
    text:{
        type:String
    }
}, {timestamps:true})

const MessageModel = mongoose.model("Messages", MessageSchema)

export default MessageModel