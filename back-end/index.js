import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express()
app.use(cors())

const DB_URL = 'mongodb+srv://admin:Creation101@cluster0.dlurz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT || 3001

mongoose.connect(DB_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> console.log('Sucessfully connected'))
.catch((error) => console.log(error.message))

app.get("/", (req,res) => {
    res.send('HOMEPAGE')
})

app.listen(PORT, () => {
    console.log('Server is hosted on port 3001')
})