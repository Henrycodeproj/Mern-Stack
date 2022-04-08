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
    UserModel.find({name:"test"}, (error, result) => {
        if (error){
            console.log(error)
        } else{
            res.json(result)
        }
    })
})

app.listen(PORT, () => {
    console.log('Server is hosted on port 3001')
})
