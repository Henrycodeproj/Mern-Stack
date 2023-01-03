import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    Description:{
        type:String,
        required:true
    },
    posterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    attending:[{ 
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Users'
     }],
    expiresAt: {
        type: Date,
        default: Date.now, 
        index: { expiresAfterSeconds: 1000 * 60 * 60 * 24 }
    },
    timeAndDate : {
        type:String
    }
},{timestamps:true})

const PostModel = mongoose.model("Posts", PostSchema)

export default PostModel