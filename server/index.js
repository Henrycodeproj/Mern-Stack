import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import UserModel from './Models/Users.js';
import PostModel from './Models/Posts.js';
import bcrypt from 'bcrypt';
import verifyTokenModel from './Models/Token.js';
import crypto from 'crypto';
import session from "express-session"
import sendMail from './config/mail.js';
import jwt from 'jsonwebtoken'
import isAuthenticated from './Middleware/auth.js';


const app = express()
app.use(express.json());

//configurations
dotenv.config();

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

//needed to change original cors setup to allow certain information through
app.use(cors(corsOptions));

const databasePassword = process.env.password

const DB_URL = `mongodb+srv://admin:${databasePassword}@cluster0.dlurz.mongodb.net/Users?retryWrites=true&w=majority`

const PORT = process.env.PORT || 3001
mongoose.connect(DB_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> console.log('Sucessfully connected to database'))
.catch((error) => console.log(error.message));

app.get("/", (req,res) => {
    console.log(req.headers)
})

app.get("/api", (req,res) => {
    UserModel.find((error, result) => {
        if (error){
            console.log(error)
            res.send(error)
        } else {
            console.log(result.username)
            res.send(result.username)
        }
    })
})

app.get('/logout', (req,res)=> {
    res.redirect("http://localhost:3000")
})

app.get('/authtest', isAuthenticated, (req,res) =>{
    if (req.isAuth) res.status(200).send(true)
    else res.status(200).send(false)
})

app.post('/posts', async (req,res) =>{
    const {user, post} = req.body
    console.log(user,post)
    const newPosts = new PostModel({
        Description:post,
        posterId:user
    })

    await newPosts.save()

    const results = await PostModel.find({}).sort({createdAt:-1})

    if (newPosts) return res.status(200).send({message:'Posted', data:results})
    return res.status(500).send({message:'error'})
})

app.get('/posts/:postAmount', isAuthenticated, async (req, res) =>{
    console.log(req.params.postAmount)
    try{
        const posts = await PostModel.find({})
        .sort({createdAt: -1})
        .limit(req.params.postAmount)
        .populate('posterId', ['username','email'])
        
        return res.status(200).send(posts)
    } catch(err){
        return res.status(500).send("Internal Server error")
    }
})

app.post('/login', async (req,res) =>{
    const {login_username, login_password} = req.body
    const user = await UserModel.findOne({username:login_username})
    if (user){
        bcrypt.compare(login_password, user.password, (err, result) =>{
            if(err) return res.status(500).send({message:'Internal server problem'})
            if(!result) return res.status(400).send({message:'This password you have entered is incorrect. Please try again.'})

            const accessToken = jwt.sign(
                {username:user.username, id:user.id},
                 process.env.SECRET_SESSION,
                { expiresIn: '1d'}
            )
            res.status(200).send(
                {
                    message:'Logging In...',
                    accessToken: accessToken, 
                    user: {id: user.id, username: user.username}
                }
            )

        })
    } else{
        res.status(404).send({message:"This user does not exist."})
    }
})

app.get("/verify/:token", async (req, res)=>{
    try {
    const result = await verifyTokenModel.findOne({token:req.params.token})
    if (!result){
        res.status(404).redirect('http://localhost:3000/invalid/expired')
    }
    const account = await UserModel.findById(result.userId._id) 
    if (account.isVerified === true) {
        res.status(500).send('You have already been verified.')
    } else {
        account.isVerified = true
        await account.save()
        res.status(200).redirect('http://localhost:3000/valid')
    }
    } catch(error){
        res.status(500).send('Internal Error')
    } 
})

app.post("/createUser", async (req,res) => {
    const {username, password, email} = req.body
    const newUser = new UserModel({
        username:username,
        password:password,
        email:email,
        isVerified:false
    })

    const salt = bcrypt.genSaltSync(10)
    newUser.password = bcrypt.hashSync(password, salt)

    await newUser.save() 
    .then(async response =>{
        //Creates token
        let emailToken = new verifyTokenModel({
            userId:newUser._id,
            token:crypto.randomBytes(64).toString('hex')
        })

        await emailToken.save()
        res.status(201).send(response)

        try{
            //sends the email with verification token 
            sendMail({
                to:"hennypenny456@gmail.com",
                from:"hennypenny456@gmail.com",
                subject:"Unplug Account Confirmation",
                text:`${emailToken.token} testing this one too`,
                html: `<a href ="http://${req.headers.host}/verify/${emailToken.token}">Click Here to Verify.</a>`
            })
        } catch(error) {
            console.log(error)
            res.status(400).send('Email verification failed to send')
        }
    }).catch (error => {
        if (error.keyValue.username && error.code === 11000) res.status(400).send(`This username ${error.keyValue.username} is already taken`)

        else if (error.keyValue.email && error.code === 11000) res.status(400).send(`This email ${error.keyValue.email} has already been signed up.`);

        else console.log(error)
    })
})

app.listen(PORT, () => {
    console.log('Server is hosted on port 3001')
})