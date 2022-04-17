import { useState } from 'react'
import { Button, Alert } from '@mui/material/';
import axios from 'axios'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



export const Signup = () =>{

    const [newUser,setnewUser] = useState({
      username:'',
      password:'',
      Confirm:'',
      email:''
    })
    
    //state errors and account hook
    const [formErrors, setformErrors] = useState({})
    const [serverError, setServerError] = useState('')
    const [createdAccount, setCreatedAccount] = useState(false)

    //states for password requirements
    const [requirements, setRequirements] = useState({uppercase:'black', numbers:'black'})
    const [confirm, setConfirm] = useState({})
    const [valid, setValid] = useState({})
    const [passwordError, setPasswordError] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        if (formCheck(newUser)){
          return
        }
        confirmPassword(newUser)
        //axios to send information
        if ((Object.keys(valid).length === 0 && Object.keys(formErrors).length === 0 && Object.keys(confirm).length === 0)){
          await axios.post('http://localhost:3001/createUser', newUser)
        .then(response => {
          if (response.status === 201){
            setCreatedAccount(true)
          }
        })
        .catch(error =>{
          setServerError(error.response.data)
        }) 
      } else {
        setPasswordError(true)
      }
    }
    // adds input values into newUser object hook
    const handleForm = (e) =>{
      const {name,value} = e.target
      if (name === 'password'){
        passwordRequirements(value)
      }
      setnewUser({...newUser, [name]:value});
    }

    const passwordRequirements = (password) =>{
      const email = /edu/;
      const numbers = /[0-9]/;
      const uppercase = /[A-Z]/;
      const errors = {}

      if (numbers.test(password)){
        requirements.numbers = 'green'
        delete errors.numbers
      } else {
        requirements.numbers ='black'
        errors.numbers = false
      }

      if (uppercase.test(password)){
        requirements.uppercase = 'green'
        delete errors.uppercase
      } else {
        requirements.uppercase ='black'
        errors.uppercase = true
      }
      setValid(errors)
    }

    const confirmPassword = (user)=> { //parameter is newuser hook which is an object
      if (user.password !== user.Confirm){
        confirm.match = "Passwords do not match";
      } else {
        delete confirm.match
      }
      return confirm
    }

    //checks for any empty field and if field input is valid
    const formCheck = (inputValues) => {
      const Errors = {};
      if (!inputValues.password){
         Errors.password = 'Password field is empty'
      }
      if (!inputValues.Confirm){
        Errors.Confirm = 'Confirm Password field is empty'
      }
      if (!inputValues.username){
        Errors.username = 'Username is required'
      }
      if (!inputValues.email){
        Errors.email = 'Email is empty'
      }

      setformErrors(Errors)

      if ((Object.keys(Errors).length) > 0){
        return true
      } else {
        return false
      }
    }

    return (
      <div>
        {passwordError && <Alert variant='filled' severity='warning' onClose={()=>setPasswordError(false)}>Your password is missing requirements</Alert>}
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

                <p className='requirement-warning' style ={{color:`${requirements.uppercase}`}}>
                  One upper case letter (A-Z)
                  {requirements.uppercase ==='green' && <CheckCircleIcon className='password-checkmark'/>}
                </p>
                <p className='requirement-warning' style ={{color:`${requirements.numbers}`}}>
                  One number (0-9)
                  {requirements.numbers ==='green' && <CheckCircleIcon className='password-checkmark'/>}
                </p>
            </label>
            <label>
              Confirm Password
                <input 
                  name = "Confirm" 
                  type = "password" 
                  value = {newUser.Confirm} 
                  onChange={handleForm}
                />
                <p>{formErrors.Confirm}</p>
                <p>{confirm.match}</p>
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
            <a>Have an account?</a>
            <div>
            <Button variant="contained" color='warning' type='submit' className='signup-submit-button'>Sign up</Button>
            </div>
        </form>
      </div>
    )
}