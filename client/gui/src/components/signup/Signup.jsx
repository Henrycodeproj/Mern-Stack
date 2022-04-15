import { useState } from 'react'
import axios from 'axios'
import { Button, Alert } from '@mui/material/';


export const Signup = () =>{

    const [newUser,setnewUser] = useState({
      username:'',
      password:'',
      Confirm:'',
      email:''
    })
    
    //state errors and account hook
    const [formErrors, setformErrors] = useState({})
    const[serverError, setServerError] = useState('')
    const[createdAccount, setCreatedAccount] = useState(false)

    //states for password requirements
    const [requirements, setRequirements] = useState({uppercase:'black', numbers:'black'})
    const[confirm, setConfirm] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        //axios to send information
        if (formValidate(newUser)){
          await axios.post('http://localhost:3001/createUser', newUser)
        .then(response => {
          if (response.status === 201){
            setCreatedAccount(true)
          }
        })
        .catch(error =>{
          setServerError(error.response.data)
        }) 
      }
    }

    // adds input values into newUser hook
    const handleForm = (e) =>{
      const {name,value} = e.target
      passwordRequirements(name,value)
      setnewUser({...newUser, [name]:value});
    }

    //if no errors, submit handler code will pass because of truthy value
    const errorChecker = (errors) =>{
      if (Object.keys(errors).length === 0){
        return true
      } else{
        return false
      }
    }

    const passwordRequirements = (name, testCase) =>{
      const email = /edu/;
      const numbers = /[0-9]/;
      const uppercase = /[A-Z]/;
      let data = {}

      if (numbers.test(testCase) && name === 'password'){
        data = {...requirements, numbers:'green'}
      }
      if(uppercase.test(testCase) && name === 'password'){
        data = {...requirements, uppercase:'green'}
      }
      if(!testCase){
        data = {uppercase:'black', numbers:'black'}
      }

      console.log(data)
      setRequirements(data)
    }

    //checks for any empty field and if field input is valid
    const formValidate = (inputValues) => {
      const errors = {};
      if (inputValues.password !== confirm){
         errors.Confirm = "Passwords do not match";
      }
      if (!inputValues.password){
         errors.password = 'Password field is empty'
      }
      if (!inputValues.password){
        errors.Confirm = 'Confirm Password field is empty'
     }
      if (!inputValues.username){
        errors.username = 'Username is required'
      }
      if (!inputValues.email){
        errors.email = 'Email is empty'
      }
      setformErrors(errors)

      return errorChecker(errors)
    }

    return (
      <div>
        {serverError && <Alert variant="filled" severity="warning" onClose = {()=> setServerError('')}>{serverError}</Alert>}
        {createdAccount && <Alert severity="success" onClose={()=>setCreatedAccount(false)}>You have successfully created your account!</Alert>}
        <h1 className='signup-title'>Sign Up</h1>
        <form className='signup' onSubmit={submitHandler}>
            <label>
              Username
                <input name = "username" 
                  value = {newUser.username} 
                  onChange={handleForm}
                />
                <p>{formErrors.username}</p>
            </label>
            <label>
              Password
                <input 
                  name = "password" 
                  type = "password"  
                  value = {newUser.password} 
                  onChange={handleForm}
                />
                <p>{formErrors.password}</p>
                <p style ={{color:`${requirements.uppercase}`}}>UpperCase</p>
                <p style ={{color:`${requirements.numbers}`}}>numbers</p>
            </label>
            <label>
              Confirm Password
                <input 
                  name = "Confirm" 
                  type = "password" 
                  //value = {newUser.Confirm} 
                  onChange={(e)=> setConfirm(e.target.value)}
                />
                <p>{formErrors.Confirm}</p>
            </label>
            <label>
              Email
                <input
                  type = "email" 
                  name = "email" 
                  value = {newUser.email} 
                  onChange = {handleForm}
                />
                <p>{formErrors.email}</p>
            </label>
            <Button variant="contained" color='warning' type='submit' className='signup-submit-button'>Sign up</Button>
        </form>
      </div>
    )
}