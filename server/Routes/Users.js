import express from 'express';
import isAuthenticated from '../Middleware/auth.js';
import UserModel from '../Models/Users.js';

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
