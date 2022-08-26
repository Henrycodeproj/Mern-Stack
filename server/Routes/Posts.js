import express from 'express';
import isAuthenticated from '../Middleware/auth.js';
import PostModel from '../Models/Posts.js';

export const router = express.Router();

router.post('/', async (req,res) =>{
    const {user, post} = req.body
    console.log(user,post)
    const newPosts = new PostModel({
        Description:post,
        posterId:user
    })

    await newPosts.save()

    const results = await PostModel.find({})
    .sort({createdAt:-1})
    .populate('posterId', ['username','email', 'createdAt'])

    if (newPosts) return res.status(200).send({message:'Posted', data:results})
    return res.status(500).send({message:'error'})
})

router.get('/all', isAuthenticated, async (req, res) =>{
    try {
        const posts = await PostModel.find({})
        .sort({createdAt: -1})
        .populate('posterId', ['username','email', 'createdAt'])
        .populate('attending', 'username')
        return res.status(200).send(posts)
    } catch(err){
        return res.status(500).send("Internal Server error")
    }
})

router.get('/:postAmount', isAuthenticated, async (req, res) =>{
    console.log(req.params.postAmount)
    try{
        const posts = await PostModel.find({})
        .sort({createdAt: -1})
        .limit(req.params.postAmount)
        .populate('posterId', ['username','email', 'createdAt'])
        .populate('attending', 'username')
        
        return res.status(200).send(posts)
    } catch(err){
        return res.status(500).send("Internal Server error")
    }
})

router.patch('/:postID/likes/:postIndex', isAuthenticated, async (req,res) =>{
    const postID = req.params.postID
    const userID = req.body.userID
    const post = await PostModel.findById(postID)

    if (post.attending.includes(userID)) post.attending = post.attending.filter((users)=> users.toString()!== userID.toString())
    else post.attending.push(userID)

    await post.save()

    const updatedPosts = await PostModel.find({})
    .sort({createdAt: -1})
    .limit(req.params.postIndex)
    .populate('posterId', ['username','email', 'createdAt'])
    .populate('attending', 'username')

    res.status(200).send(updatedPosts)
})