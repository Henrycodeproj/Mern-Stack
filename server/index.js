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
.then(()=> console.log('Sucessfully connected to database'))
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
 
app.post("/login", async (req, res)=>{
    const data = req.body
    const user = await UserModel.findOne({username:data.login_username})
        if (user && user.isVerified === true) {
            if (bcrypt.compareSync(data.login_password, user.password)) {
                res.status(200).send('Logging In...')
            } else{
                res.status(406).send('Incorrect Password!')
            }
        } else {
            res.status(406).send('Your account is not verified.')
        }

})
    
app.post("/createUser", async (req,res) => {
    const {username,password, email} = req.body
    const newUser = new UserModel({
        username:username,
        password:password,
        email:email,
        isVerified:false
    })

    const salt = bcrypt.genSaltSync(10)
    newUser.password = bcrypt.hashSync(password, salt)

    await newUser.save().then(response =>{
        res.status(201).send(response)

    }).catch (error => {
        if (error.keyValue.username && error.code === 11000){
            res.status(406).send(`This username ${error.keyValue.username} is already taken`)
        } 
        else if (error.keyValue.email && error.code === 11000){
            res.status(406).send(`This email ${error.keyValue.email} has already been signed up.`);
        } else {
            console.log(error)
        }
    })
})

app.listen(PORT, () => {
    console.log('Server is hosted on port 3001')
})