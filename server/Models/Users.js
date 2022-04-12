import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    email: String
}, {timestamps:true})

const UserModel = mongoose.model("Users", UserSchema)

export default UserModel
