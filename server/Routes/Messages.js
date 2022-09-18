import express from "express"
import isAuthenticated from '../Middleware/auth.js';
import MessageModel from "../Models/messages.js";

export const router = express.Router()

router.get('/recent/all/:id', isAuthenticated, async (req, res) => {
    const currentUserId = req.params.id
    const g = await MessageModel.aggregate([
        {
            $group : {"_id":"$name","doc":{"$first":"$$ROOT"}, lastConversations: { $addToSet: '$conversationId'}}
        },
        {"$replaceRoot":{"newRoot":"$doc"}},
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $limit:3
        }
    ])
    console.log(g)
    try {
        const results = 
            await MessageModel.find({senderId: currentUserId})
            .sort({ createdAt:-1 })
            .populate('recipientId', ['username'])
        res.send(results)
    } catch (err) {
        res.send(err)
    }
})

router.post('/send/', isAuthenticated, async (req, res) =>{
    const {chatId, message, senderId, recipientId} = req.body

    const newMessage = new MessageModel({
        conversationId:chatId,
        senderId:senderId,
        message:message,
        recipientId:recipientId
    })

    const savedMessage = await newMessage.save()
    
    if (savedMessage) res.status(200).send({message:"Message sent"})
})
