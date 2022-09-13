import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import UserModel from './Models/Users.js';
import bcrypt from 'bcrypt';
import verifyTokenModel from './Models/Token.js';
import crypto from 'crypto';
import sendMail from './config/mail.js';
import jwt from 'jsonwebtoken'
import isAuthenticated from './Middleware/auth.js';
import { router as PostsRouter } from './Routes/posts.js';
import { router as UserRouter } from './Routes/Users.js'
import { router as MessageRouter } from './Routes/Messages.js'
import { router as ConversationRouter } from "./Routes/Conversations.js"
import { Server } from 'socket.io';
import { createServer } from "http"; 


const app = express()

//configurations
dotenv.config();

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

const httpServer = createServer(app);
const databasePassword = process.env.password
const PORT = process.env.PORT || 3001

const io = new Server(httpServer, {
    cors:{
        origin:'http://localhost:3000',
        methods:["GET", "POST", "PATCH", "DELETE"],
        credentials:true
    }
});

app.use(cors(corsOptions));
app.use(express.json());
app.use('/posts', PostsRouter);
app.use('/user', UserRouter);
app.use('/message', MessageRouter);
app.use('/conversation', ConversationRouter);

const DB_URL = `mongodb+srv://admin:${databasePassword}@cluster0.dlurz.mongodb.net/Users?retryWrites=true&w=majority`

mongoose.connect(DB_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> console.log('Sucessfully connected to database'))
.catch((error) => console.log(error.message));

app.get('/authtest', isAuthenticated, (req,res) =>{
    if (req.isAuth) res.status(200).send(true)
    else res.status(200).send(false)
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

let activeUsers = []

io.on("connection", (socket) => {
    socket.on("status", (userInfo) => {
        if (userInfo.userId && !activeUsers.some(user => user.userId === userInfo.userId)) activeUsers.push({userId:userInfo.userId, socketId:socket.id})
        socket.emit("activeUsers", activeUsers)
    })
    socket.on("logout", (data) =>{
        console.log(data)
        activeUsers = activeUsers.filter(ids => ids.userId !== data.userId)
    })
    socket.on("sendUserId", (data)=>{
        socket.broadcast.emit(`${data.chatId}`, {message:data.message})
    });

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter(ids => ids.socketId !== socket.id)
    });
})

httpServer.listen(PORT, () => {
    console.log('Server is hosted on port 3001');
});
