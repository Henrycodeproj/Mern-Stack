import e from "express"
import express from "express"
import isAuthenticated from "../Middleware/auth.js"
import ConversationModel from "../Models/Conversations.js"
import MessageModel from "../Models/messages.js"

export const router = express.Router()

router.post('/create', isAuthenticated, async (req, res) => {
    const { user1, user2 } = req.body

    const check = await ConversationModel.find({
        participants:[user1, user2]
    })

    if (check.length === 0){
        const startConversation = new ConversationModel({
            participants:[user1, user2]
        })

        await startConversation.save()

        const newConversation = await ConversationModel.find({user1, user2})
        res.status(200).send(newConversation)
    }
})

router.get('/:conversationId', isAuthenticated, async (req, res) => {
    const conversationId = await ConversationModel
    .find({ 
        _id:req.params.conversationId,
        participants:req.results.id
     })

    if (conversationId.length === 0) return res.status(401).send({message:"Unauthorized"})

    try{
        const results = await MessageModel.find({ conversationId:req.params.conversationId })
        if (results) res.status(200).send(results) 
    } catch(err) {
        res.status(404).send({message:"User is not found"})
    }

})
