import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import UserModel from './Models/Users.js';
import bcrypt from 'bcrypt'


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
            res.send(error)
        } else {
            res.json(result)
        }
    })
})
app.post("/login", (req, res)=>{
    const data = req.body
})

app.post("/createUser", async (req,res) => {
    const data = req.body
    const newUser = new UserModel(data)

    const salt = bcrypt.genSaltSync(10)
    newUser.password = bcrypt.hashSync(data.password, salt)

    await newUser.save().then(response =>{
        res.status(201).send(response)

    }).catch (error => {
        if (error.keyValue.username && error.code === 11000){
            res.status(406).send(`This username ${error.keyValue.username} is already taken`)
        } 
        else if (error.keyValue.email && error.code === 11000){
            res.status(406).send(`This email ${error.keyValue.email} has already been signed up.`);
        }
    })
})

app.listen(PORT, () => {
    console.log('Server is hosted on port 3001')
})