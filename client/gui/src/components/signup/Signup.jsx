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
    const[serverError, setServerError] = useState('')
    const[createdAccount, setCreatedAccount] = useState(false)

    //states for password requirements
    const [requirements, setRequirements] = useState({uppercase:'black', numbers:'black'})
    const[confirm, setConfirm] = useState('')
    const [valid, setValid] = useState({})

    const submitHandler = async (e) => {
        e.preventDefault()
        //axios to send information
        formCheck(newUser)
        if ((Object.keys(valid).length === 0 && Object.keys(formErrors).length ===0)){
          console.log(valid, newUser,formErrors, 'asdasd')
          await axios.post('http://localhost:3001/createUser', newUser)
        .then(response => {
          if (response.status === 201){
            setCreatedAccount(true)
          }
        })
        .catch(error =>{
          setServerError(error.response.data)
        }) 
      } else{
        console.log(valid, newUser,formErrors,)
      }
    }

    // adds input values into newUser hook
    const handleForm = (e) =>{
      const {name,value} = e.target
      passwordRequirements(value)
      setnewUser({...newUser, [name]:value});
      console.log(requirements)
    }

    const passwordRequirements = (testCase) =>{
      const email = /edu/;
      const numbers = /[0-9]/;
      const uppercase = /[A-Z]/;
      const errors = {}

      if (numbers.test(testCase)){
        requirements.numbers = 'green'
        delete valid.number
      } else {
        requirements.numbers = 'black'
        errors.number = false
      }

      if (uppercase.test(testCase)){
        requirements.uppercase = 'green'
        delete valid.uppercase
      } else {
        requirements.uppercase = 'black'
        errors.uppercase = false
      }

      setValid(errors)
    }

    //checks for any empty field and if field input is valid
    const formCheck = (inputValues) => {
      const Errors = {};
      if (!inputValues.password){
         Errors.password = 'Password field is empty'
      }
      if (!confirm){
        Errors.Confirm = 'Confirm Password field is empty'
      }
      if (!inputValues.username){
        Errors.username = 'Username is required'
      }
      if (!inputValues.email){
        Errors.email = 'Email is empty'
      }
      if (inputValues.password !== confirm){
        Errors.match = "Passwords do not match";
      }
      setformErrors(Errors)
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
            <a>Have an account?</a>
            <div>
            <Button variant="contained" color='warning' type='submit' className='signup-submit-button'>Sign up</Button>
            </div>
        </form>
      </div>
    )
}