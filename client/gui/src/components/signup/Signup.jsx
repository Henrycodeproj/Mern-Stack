import {useState} from 'react'
import axios from 'axios'
import {Button, Alert} from '@mui/material/';


export const Signup = () =>{

    const [newUser,setnewUser] = useState({
      username:'',
      password:'',
      ConfirmPassword:'',
      email:''
    })

    const [formErrors, setformErrors] = useState({})
    const[serverError, setServerError] = useState('')
    const[createdAccount, setCreatedAccount] = useState(false)

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

    //checks for any empty field and if field input is valid
    const formValidate = (values) => {
      const errors = {};
      if (values.password !== values.ConfirmPassword){
         errors.ConfirmPassword = "Passwords do not match";
      }
      if (!values.password){
         errors.password = 'Password field is empty'
      }
      if (!values.ConfirmPassword){
        errors.Confirmpassword = 'Input your password again'
      }
      if (!values.username){
        errors.username = 'Username is required'
      }
      if (!values.email){
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
            </label>
            <label>
              Confirm Password
                <input 
                  name = "ConfirmPassword" 
                  type = "password" 
                  value = {newUser.ConfirmPassword} 
                  onChange={handleForm}
                />
                <p>{formErrors.ConfirmPassword}</p>
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
            <Button variant="contained" color='warning' type='submit' className='signup-submit-button'>Contained</Button>
        </form>
      </div>
    )
}