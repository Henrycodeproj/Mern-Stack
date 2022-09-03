import express from "express"
import isAuthenticated from '../Middleware/auth.js';
import MessageModel from "../Models/messages.js";

export const router = express.Router()

router.get('/:conversationId', isAuthenticated, async (req, res) => {
    const results = await MessageModel.find({conversationID:req.params.conversationId})
    if (results) res.status(200).send(results)
    else res.status(404).send("nothing")
})
