import express from 'express';
import isAuthenticated from '../Middleware/auth.js';
import PostModel from '../Models/Posts.js';

export const router = express.Router();

router.post('/', isAuthenticated, async (req,res) =>{
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

router.get('/amount/:postAmount', isAuthenticated, async (req, res) =>{
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

router.get('/:postID/attend/:currentShown', isAuthenticated, async (req, res) =>{
    try{
        const posts = await PostModel.findById(req.params.postID)
        .sort({createdAt: -1})
        .limit(req.params.currentShown)
        .populate('attending', 'username')
        
        return res.status(200).send(posts.attending.slice(3))
    } catch(err){
        return res.status(500).send("Internal Server error")
    }
})

router.patch('/likes/:postID/:postIndex', isAuthenticated, async (req,res) =>{

    const postID = req.params.postID
    const userID = req.body.user
    const post = await PostModel.findById(postID)

    if (post.attending.includes(userID)) post.attending = post.attending.filter((users)=> users.toString() !== userID.toString())
    else post.attending.push(userID)

    await post.save()

    const updatedPosts = await PostModel.find({})
    .sort({createdAt: -1})
    .limit(req.params.postIndex)
    .populate('posterId', ['username','email', 'createdAt'])
    .populate('attending', 'username')

    res.status(200).send(updatedPosts)
})

router.get('/popular', async (req, res) => {
    const results = await PostModel.aggregate([
        {
            $addFields: {
              attendingLength: {
                $size: "$attending"
              }
            }
        },
        {
            $sort: {
                attendingLength: -1
            }
        },
        {
            $limit:3
        },
        {
            $lookup: {
                from: "users",
                localField: "posterId",
                foreignField: "_id",
                as: "original_poster"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "attending",
                foreignField: "_id",
                as: "attending_info"
            }
        }
    ])
    
    return res.status(200).send(results)
})