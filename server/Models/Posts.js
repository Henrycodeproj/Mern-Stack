import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    Description:{
        type:String,
        required:true
    },
    posterId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Users"
    },
    expiresAt: {
        type: Date, default: Date.now, index: { expires: 1800 }
    }
},{timestamps:true})

const PostModel = mongoose.model("Posts", postSchema)

export default PostModel