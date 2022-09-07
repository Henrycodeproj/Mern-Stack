import express from "express"
import isAuthenticated from '../Middleware/auth.js';
import MessageModel from "../Models/messages.js";

export const router = express.Router()

// router.get('/:conversationId', isAuthenticated, async (req, res) => {
//     const results = await MessageModel.find({conversationID:req.params.conversationId})
//     if (results) res.status(200).send(results)
//     else res.status(404).send("nothing")
// })

router.get
router.post('/send', isAuthenticated, async (req, res) =>{
    const {chatId, message, senderId} = req.body

    const newMessage = new MessageModel({
        conversationId:chatId,
        senderId:senderId,
        message:message
    })

    const savedMessage = await newMessage.save()
    
    if (savedMessage) res.status(200)
})
