import { useState} from 'react'
import { Button, Alert, CircularProgress } from '@mui/material/';
import { motion, AnimatePresence,} from "framer-motion"
import { Login } from './Login';
import axios from 'axios'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GoogleIcon from '@mui/icons-material/Google';
import { SideImage } from './SideImage';

export const Signup = () =>{

    const [newUser,setnewUser] = useState({
      username:'',
      password:'',
      Confirm:'',
      email:''
    })
    
    const [createdAccount, setCreatedAccount] = useState(false)
    const [signLoading, setSignLoading] = useState(false)

    //state errors
    const [formErrors, setformErrors] = useState({})
    const [serverError, setServerError] = useState('')
    const [emailError, setEmailError] = useState(false)

    //states for password requirements
    const [requirements, setRequirements] = useState({uppercase:'black', numbers:'black', length:'black'})
    const [confirm, setConfirm] = useState({})
    const [valid, setValid] = useState({})
    const [passwordError, setPasswordError] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        if (formCheck(newUser) || !emailCheck(newUser.email)){
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
      } else if(Object.keys(valid).length > 0){
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

    const emailCheck = (email) => {
      const check = /.edu$/;
      if(!check.test(email)){
        setEmailError(true)
        return false
      } else {
        return true
      }
    }

    const passwordRequirements = (password) =>{
      const numbers = /[0-9]/;
      const uppercase = /[A-Z]/;
      const errors = {}

      if (numbers.test(password)){
        requirements.numbers = '#005700'
        delete errors.numbers
      } else {
        requirements.numbers ='black'
        errors.numbers = false
      }

      if (uppercase.test(password)){
        requirements.uppercase = '#005700'
        delete errors.uppercase
      } else {
        requirements.uppercase ='black'
        errors.uppercase = false
      }

      if (password.length > 6){
        requirements.length = '#005700'
        delete errors.length
      } else {
        requirements.length ='black'
        errors.length = false
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
    const active ={
      borderStyle:'solid',
      borderRadius:'8px',
      backgroundColor:'rgb(149, 117, 205, .5)',
      boxShadow:'.5px .5px 5px 0px',
    }
    const inactive = {
      borderStyle:'none'
    }

    const [option, setOption] = useState(true)

    return (
      <main>
        <div className='landing-wrapper'>
          <div className='signup-container'>
            {option ?
            <motion.div
              initial={{ opacity:0.25 }}
              animate={{ opacity: 1}}
              transition={{ duration: 1 }}
            >
              <div className='space'>
              <motion.h1
              initial={{ opacity: 0.25, }}
              animate={{ opacity: 1}}
              transition = {{ duration:1 }}
              className='signup-title' style= {option ? active: inactive} onClick={()=> setOption(true)}>
                Sign Up
              </motion.h1>
              <h1 className='signup-title' style= {option ? inactive: active} onClick={()=> setOption(false)}     >Sign In</h1>
              </div>
            
              {passwordError && <Alert variant='filled' severity="secondary" onClose={()=>setPasswordError      (false)}>Your password is missing requirements</Alert>}
              {serverError && <Alert variant="filled" severity="secondary" onClose = {()=> setServerError('')     }>{serverError}</Alert>}
              {emailError && <Alert variant ="filled" severity= "secondary" onClose={()=>setEmailError(false)     }>Your email does not end with edu</Alert>}
              {createdAccount && <Alert severity="success" onClose={()=>setCreatedAccount(false)}>You have      successfully created your account, you may now login.</Alert>}
            
              <form className='signup' onSubmit={submitHandler}>
                  <label>
                    <h3>Username</h3>
                      <input name = "username" 
                        value = {newUser.username} 
                        onChange={handleForm}
                      />
                      {<p className='form-errors'>{formErrors.username}</p>}
                  </label>
            
                  <label>
                    <h3>Password</h3>
                      <input 
                        name = "password" 
                        type = "password"  
                        value = {newUser.password} 
                        onChange={handleForm}
                      />
                      <p className='form-errors'>{formErrors.password}</p>
                      <p className='requirement-warning' style ={{color:`${requirements.length}`}}>
                        Password length must be 6 or more
                        {requirements.length ==='#005700' && <CheckCircleIcon className='password-checkmark'/     >}
                      </p>
                      <p className='requirement-warning' style ={{color:`${requirements.uppercase}`}}>
                        One upper case letter (A-Z)
                        {requirements.uppercase ==='#005700' && <CheckCircleIcon      className='password-checkmark'/>}
                      </p>
                      <p className='requirement-warning' style ={{color:`${requirements.numbers}`}}>
                        One number (0-9)
                        {requirements.numbers ==='#005700' && <CheckCircleIcon      className='password-checkmark'/>}
                      </p>
                  </label>
                  <label>
                    <h3>Confirm Password</h3>
                      <input 
                        name = "Confirm" 
                        type = "password" 
                        value = {newUser.Confirm} 
                        onChange={handleForm}
                      />
                      <p className='form-errors'>{formErrors.Confirm}</p>
                      <p className='form-errors'>{confirm.match}</p>
                  </label>
                  <label>
                    <h3>Email</h3>
                      <input
                        type = "email" 
                        name = "email" 
                        value = {newUser.email} 
                        onChange = {handleForm}
                      />
                      <p className='form-errors'>{formErrors.email}</p>
                  </label>
                    <a href='https://google.com'><GoogleIcon/></a>
                  <div className='submit-section'>
                  <Button variant="contained" color='secondary' type='submit'       className='signup-submit-button'>Sign up</Button>
                  {signLoading && <CircularProgress color="inherit" />}
                  </div>
              </form>
            </motion.div>
            :
            <Login 
            setOption = {setOption}
            option = {option}
            active = {active}
            inactive = {inactive}
            />
            }
          </div>
        <SideImage/>
      </div>
    </main>
  )
}