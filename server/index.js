import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import UserModel from './Models/Users.js';


const app = express()

app.use(cors());
app.use(express.json());
dotenv.config()

const password = process.env.password

const DB_URL = `mongodb+srv://admin:${password}@cluster0.dlurz.mongodb.net/Users?retryWrites=true&w=majority`

const PORT = process.env.PORT || 3001

mongoose.connect(DB_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> console.log('Sucessfully connected'))
.catch((error) => console.log(error.message))

app.get("/", (req,res) => {
    res.send('HOMEPAGE')
})

app.get("/api", (req,res) => {
    UserModel.find({}, (error, result) => {
        if (error){
            console.log(error)
        } else {
            res.json(result)
        }
    })
})

app.post("/createUser", async (req,res) => {
    const data = req.body
    const newUser = new UserModel(data)

    await newUser.save().then(response =>{
        res.status(201).send(response)

    }).catch (error => {
        if (error.keyValue.username && error.code === 11000){
            console.log(error.keyValue.username)
            res.status(406).send(`${error.keyValue.username} is unavailable`)
        } else if (error.keyValue.email && error.code === 11000){
            console.log(error.keyValue.email)
            res.status(406).send(`${error.keyValue.email} is already taken.`);
        }
    })
})

app.listen(PORT, () => {
    console.log('Server is hosted on port 3001')
})
