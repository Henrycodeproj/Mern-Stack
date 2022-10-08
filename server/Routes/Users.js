import express from 'express';
import isAuthenticated from '../Middleware/auth.js';
import UserModel from '../Models/Users.js';
import ConversationModel from '../Models/Conversations.js';

export const router = express.Router()

router.get("/information/:id", isAuthenticated, async (req, res)=>{
    try {
        const results = await UserModel.findById(req.params.id)
        if (results) res.status(200).send(results)
        else res.status(404).send({message:"User not found"})
    }catch(err) {
        res.status(500).send(err)
    }
})

router.get("/recent/conversation/:id", isAuthenticated, async (req,res)=>{
    try {
        const results = await ConversationModel.find({participants:req.params.id})
        console.log(results)
    } catch(error) {
        console.log(err)
    }
})

router.patch("/update/description/:userId", async (req,res) => {
    const newDescription = req.body.description
    try {
        const user = await UserModel.findOne({id:req.params.userId})
        if (user && newDescription) {
            user.selfDescription = newDescription
            await user.save()
        }
        res.send(user)
    } catch (error){
        console.log(error)
    }
})