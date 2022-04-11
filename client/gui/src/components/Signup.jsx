import { useState, useEffect } from 'react'
import axios from 'axios'

export const Signup = () =>{

    const api = axios.create({
        baseURL:'http://localhost:3001/'
      })
    
    const [newUser,setnewUser] = useState({
      username:"",
      password:""
    })

    const submitHandler = (e) => {
        e.preventDefault()
        api.post('http://localhost:3001/createUser', newUser)
        .then(response => {
            console.log(response)
        })
        .catch(error => console.log(error)) 
    }

    const handleForm = (e) =>{
      const {name,value} = e.target
      setnewUser({...newUser, [name]:value});
      console.log(newUser)
    }

    return (
        <form onSubmit={submitHandler}>
            <label>Username</label>
            <input name = "username" value = {newUser.username} onChange={handleForm}></input>
            <label>Password</label>
            <input name = "password" value = {newUser.password} onChange={handleForm}></input>
            <label>Email</label>
            <input name = "email" value = {newUser.email} onChange = {handleForm}></input>
            <button type='submit'>submit</button>
        </form>
    )
}