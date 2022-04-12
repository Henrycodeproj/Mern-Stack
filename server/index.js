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

app.post("/createUser", (req,res) => {
    const data = req.body
    UserModel.find({ username:'henry' }, (error, result)=>{
        if (error){
            return error
        } else {
            return result
        }
    try {
            const newUser = new UserModel(data)
            newUser.save()
            res.status(200).send(data)
        } catch(error) {
            console.log(error)
            res.status(400).send(error)
        }
    })
})

app.listen(PORT, () => {
    console.log('Server is hosted on port 3001')
})
