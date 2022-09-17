import express from "express"
import isAuthenticated from '../Middleware/auth.js';
import MessageModel from "../Models/messages.js";

export const router = express.Router()

router.get
router.post('/send/', isAuthenticated, async (req, res) =>{
    const {chatId, message, senderId} = req.body

    const newMessage = new MessageModel({
        conversationId:chatId,
        senderId:senderId,
        message:message
    })

    const savedMessage = await newMessage.save()
    
    if (savedMessage) res.status(200).send({message:"Message sent"})
})
