import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import UserModel from './Models/Users.js';
import bcrypt from 'bcrypt';
import verifyTokenModel from './Models/Token.js';
import crypto from 'crypto';
import sendMail from './config/mail.js';
import isAuthenticated from './Middleware/auth.js';
import { router as PostsRouter } from './Routes/posts.js';
import { router as UserRouter } from './Routes/Users.js'
import { router as MessageRouter } from './Routes/Messages.js'
import { router as ConversationRouter } from "./Routes/Conversations.js"
import { router as LoginRouter } from "./Routes/Login.js"
import { Server } from 'socket.io';
import { createServer } from "http";
import NotificationModel from './Models/Notifications.js';


const app = express()

//configurations
dotenv.config();

const corsOptions ={
    origin:'*',
    credentials:true,           
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
app.use('/login', LoginRouter);

const DB_URL = `mongodb+srv://admin:${databasePassword}@cluster0.dlurz.mongodb.net/Users?retryWrites=true&w=majority`

mongoose.connect(DB_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> console.log('Sucessfully connected to database'))
.catch((error) => console.log(error.message));

app.get('/authtest', isAuthenticated, (req,res) =>{
    if (req.isAuth) res.status(200).send(true)
    else res.status(200).send(false)
})

app.get("/verify/:token", async (req, res)=>{
    try {
        const result = await verifyTokenModel.findOne({token:req.params.token})
        if (!result) return res.status(404).redirect('http://localhost:3000/invalid/expired')

        const account = await UserModel.findById(result.userId._id) 
        if (account.isVerified) return res.status(500).send('You have already been verified.')

        account.isVerified = true
        await account.save()
        res.status(200).redirect('http://localhost:3000/valid')
    
    } catch(error) {
        res.status(500).send('Internal Server Error')
    } 
})

app.post("/createUser", async (req,res) => {
    const {username, password, email} = req.body

    console.log(username, password, email)

    const newUser = new UserModel({
        username:username.charAt(0).toUpperCase() + username.slice(1).toLowerCase(),
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

let activeUsers = {}

io.on("connection", (socket) => {
    socket.on("status", (userInfo) => {
        if (userInfo.userId) {
            activeUsers[userInfo.userId] = socket.id
            socket[socket.id] = userInfo.userId
        }
        io.emit("activeUsers", activeUsers)
    })
    socket.on("logout", (data) => {
        delete activeUsers[data.userID]
        io.emit("inactiveUsers", activeUsers)
    })
    socket.on("notification", (data) => {
        const {posterID, postID} = data
        //change time to 2000 ms for production
        setTimeout(async () => {
            const response = await NotificationModel.find({notifiedUser: posterID, postId:postID})
            .populate('attendId', ['username','email', 'createdAt', 'profilePicture'])
            .populate('postId', ['_id'])
            console.log(response)
            socket.broadcast.emit(`${data.posterID}-notification`, response)
        }, 2000);
    })
    // new chats socket handler
    socket.on("messages", (newChatInfo) => {
        const newMessage = {
            _id: newChatInfo.chatId,
            recieverInfo: [
                {
                    _id: newChatInfo.recipientId,
                    username: newChatInfo.recipientUsername
                }
            ],
            senderInfo: [
                {
                    _id: newChatInfo.senderId,
                    username: newChatInfo.senderUsername
                }
            ]
        }
        socket.broadcast.emit(`${newChatInfo.recipientId}`, newMessage)
    })

    //Direct Messages
    socket.on("sendUserId", data =>{
        socket.broadcast.emit(`${data.chatId}`, data)
    });

    socket.on("disconnect", () => {
        delete activeUsers[socket[socket.id]]
        io.emit("inactiveUsers", activeUsers)
        console.log(activeUsers, 'remaining active users')
    });
})

httpServer.listen(PORT, () => {
    console.log('Server is hosted on port 3001');
});
