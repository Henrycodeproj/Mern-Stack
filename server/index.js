import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import UserModel from './Models/Users.js';
import bcrypt from 'bcrypt';
import verifyTokenModel from './Models/Token.js';
import crypto from 'crypto';
import session from "express-session"
import sendMail from './config/mail.js';
import passport from 'passport';
import LocalStrategy from "passport-local"


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

passport.serializeUser(function(user, done) {
    console.log('Serializer Working') 
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    console.log('deSerializer Working') 
    UserModel.findById(id, function(err, user) {
      done(err, user);
      });
  });
  
  passport.use(new LocalStrategy({usernameField: 'login_username', passwordField: 'login_password'},
  function (username,password,done) {
      UserModel.findOne({username:username}, (err, user) => {
          if (err) throw err
          if (!user) return done(null, false, {message:'This user does not exist'})
          bcrypt.compare(password, user.password, (err, result) =>{
              if (err) throw err;
              if (!result) return done(null, false, {message:'Your password is incorrect'})
              else if (result && !user.isVerified) return done(null, false, {message: 'Your account is not verified'})
              else {
                  return done(null, user, {message:'Logging in...'})
              }
          })
      })
  }
  ))
//passport js middleware
app.use(session({
    secret:process.env.SECRET_SESSION,
    resave:false,
    saveUninitialized:false,
}))

app.use(passport.initialize())
app.use(passport.session())

const databasePassword = process.env.password

const DB_URL = `mongodb+srv://admin:${databasePassword}@cluster0.dlurz.mongodb.net/Users?retryWrites=true&w=majority`

const PORT = process.env.PORT || 3001
mongoose.connect(DB_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> console.log('Sucessfully connected to database'))
.catch((error) => console.log(error.message));



app.get("/", (req,res) => {
    console.log(req.session)
})


app.get("/fun", (req,res) => {
    console.log(req.session)
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

app.get('/users', async (req, res) =>{
    try{
        const g = await UserModel.find({})
        return res.status(200).send(g)
    } catch(err){
        res.status(500).send("Internal Server error")
    }
})

app.get('/logout', (req,res)=> {
    req.logOut()
    res.redirect("http://localhost:3000")
})

app.get('/test', (req,res) =>{
    if(req.isAuthenticated()){
        res.send('good')
    } else{
        res.send('no good')
    }
})

// app.post('/login', function(req, res, next){ 
//     passport.authenticate('local', function(err, user, info) {
//         if (err) res.status(500).send(err)
//         if (!user)res.status(401).send(info.message)
//     req.logIn(user, function(err) {
//             if (err) return next(err)
//             res.status(200).send({message:info.message, user:user})
//         })
//     })(req, res, next)
// })

// app.post('/login',passport.authenticate('local', {successRedirect:'/users', failureRedirect: '/login'}),
//     function(req,res,next){
// });

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.status(200).send({user:req.user})
  });


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
        if (error.keyValue.username && error.code === 11000){
            res.status(400).send(`This username ${error.keyValue.username} is already taken`)
        } 
        else if (error.keyValue.email && error.code === 11000){
            res.status(400).send(`This email ${error.keyValue.email} has already been signed up.`);
        } else {
            console.log(error)
        }
    })
})

app.listen(PORT, () => {
    console.log('Server is hosted on port 3001')
})