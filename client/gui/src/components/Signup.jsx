import {useState} from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert';

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
        if (formValidate(newUser)){
          await axios.post('http://localhost:3001/createUser', newUser)
        .then(response => {
          if (response.status === 201){
            setCreatedAccount(true)
          }
        })
        .catch(error =>{
          console.log(Object.getOwnPropertyNames(error))
          setServerError(error.response.data)
        }) 
      }
    }
    // adds input values into newUser hook
    const handleForm = (e) =>{
      const {name,value} = e.target
      setnewUser({...newUser, [name]:value});
    }

    const errorChecker = (errors) =>{
      if (Object.keys(errors).length === 0){
        return true
      } else{
        return false
      }
    }

    const formValidate = (values) => {
      const errors = {};
      if (values.password !== values.ConfirmPassword){
         errors.ConfirmPassword = "Passwords do not match";
      }
      if (!values.password){
         errors.password = 'password field is empty'
      }
      if (!values.ConfirmPassword){
        errors.Confirmpassword = 'Input your password again'
      }
      if (!values.username){
        errors.username = 'Username is required'
      }
      setformErrors(errors)

      return errorChecker(errors)
    }

    return (
        <form className='signup' onSubmit={submitHandler}>
          {serverError && <Alert variant="filled" severity="warning">{serverError}</Alert>}
          {createdAccount && <Alert severity="success">You have successfully created your account</Alert>}
            <label>Username</label>
                <input name = "username" 
                  value = {newUser.username} 
                  onChange={handleForm}
                />
            <p>{formErrors.username}</p>
            <label>Password</label>
                <input 
                  name = "password" 
                  type = "password"  
                  value = {newUser.password} 
                  onChange={handleForm}
                />
            <p>{formErrors.password}</p>
            <label>Confirm Password</label>
                <input 
                  name = "ConfirmPassword" 
                  type = "password" 
                  value = {newUser.ConfirmPassword} 
                  onChange={handleForm}
                />
            <p>{formErrors.ConfirmPassword}</p>
            <label>Email</label>
                <input 
                  name = "email" 
                  value = {newUser.email} 
                  onChange = {handleForm}
                />
            <p>{formErrors.email}</p>
            <button type='submit'>submit</button>
        </form>
    )
}