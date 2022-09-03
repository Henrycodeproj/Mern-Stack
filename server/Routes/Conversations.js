import express from "express"
import isAuthenticated from "../Middleware/auth.js"
import ConversationModel from "../Models/Conversations.js"

export const router = express.Router()

router.post('/create', isAuthenticated, async (req, res) => {
    const { user1, user2 } = req.body
    console.log(user2)

    const check = await ConversationModel.find({
        participants:[user1, user2]
    })

    if (check.length === 0){
        const startConversation = new ConversationModel({
            participants:[user1, user2]
        })

        await startConversation.save()
        res.status(200)
    }
})

router.get('/:conversationId', isAuthenticated, async (req, res) => {
    
})