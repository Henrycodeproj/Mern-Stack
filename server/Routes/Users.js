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

router.patch("/update/description/:userId", isAuthenticated, async (req,res) => {
    const newDescription = req.body.description
    if (req.results.id !== req.params.userId) return res.status(400).send({message: "You are not authorized to change this"})
    try {
        const user = await UserModel.findOne({_id:req.params.userId})
        if (user && newDescription) {
            user.selfDescription = newDescription
            await user.save()
        }
        res.send(user)
    } catch (error){
        console.log(error)
    }
})

router.patch("/update/socials/:userId", async (req, res) => {
    const socialMediaLinks = req.body
    try {
        const user = await UserModel.findOne({_id:req.params.userId})
        if (socialMediaLinks.twitter) user.socialMedia.set('twitter', socialMediaLinks.twitter)
        if (socialMediaLinks.instagram) user.socialMedia.set('instagram', socialMediaLinks.instagram)
        if (socialMediaLinks.facebook) user.socialMedia.set('facebook', socialMediaLinks.facebook)
        if (socialMediaLinks.linkedin) user.socialMedia.set('linkedin', socialMediaLinks.linkedin)
        if (socialMediaLinks.github) user.socialMedia.set('github', socialMediaLinks.github)
        user.save()
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
    }
})

router.patch("")