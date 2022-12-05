import express from 'express';
import isAuthenticated from '../Middleware/auth.js';
import UserModel from '../Models/Users.js';
import ConversationModel from '../Models/Conversations.js';
import NotificationModel from '../Models/Notifications.js';

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

router.patch("/update/socials/:userId", isAuthenticated, async (req, res) => {
    const socialMediaLinks = req.body
    try {
        const user = await UserModel.findOne({_id:req.params.userId})
        if (user){
            for (const socials in socialMediaLinks) {
                if (socialMediaLinks[socials]) user.socialMedia.set(`${socials}`, socialMediaLinks[socials])
            }
        }
        user.save()
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
    }
})

router.patch("/update/current/socials/:userId", isAuthenticated, async (req, res) => {
    const socialLink = req.body.socialMediaLink

    try {
        const user = await UserModel.findOne({_id: req.params.userId})
        if (user.socialMedia.has(socialLink)) user.socialMedia.set(socialLink,'')
        user.save()
        console.log(user)
        res.send(user)
    } catch (error) {
        console.log(error)
    } 
})

router.patch("/update/college/:userId", isAuthenticated, async (req, res) => {
    const updatedCollege = req.body.affiliation
    try {
        const user = await UserModel.findOne({_id: req.params.userId})
        user.collegeAffiliation = updatedCollege
        user.save()
        res.send(user)
    } catch(error) {
        console.log(error)
    }
})

router.patch("/update/profileImage/:userId", isAuthenticated, async (req, res) => {
    try {
        const filter = { _id : req.params.userId }
        const update = { profilePicture : req.body.data}

        const currentResults = await UserModel.findByIdAndUpdate(filter, update)

        const updatedResults = await UserModel.findById(req.params.userId)

        if (updatedResults) return res.status(200).send({new : updatedResults, prev : currentResults})
    } catch (error) {
        console.log(error)
    }
})

router.post("/:userId/notifications", isAuthenticated, async (req, res) => {
    console.log(req.params.userId, req.body)
    const notification = new NotificationModel({
        notifiedUser: "637006051cc69b448ad1f065",
        postId: "63773470a8a07271809b80a5",
        attendId: "637eabf1a73b3d9992892f28",
    })
    await notification.save()
})