import { motion } from "framer-motion"
import {useState } from 'react'
import { Button, Alert, CircularProgress } from "@mui/material"
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

export const Login = ({setOption, option, active, inactive}) => {

    const [loginInfo, setLoginInfo] = useState({
        login_username:"",
        login_password:""
      })

    const [serverError, setServerError] = useState('')
    const [loggedIn, setLoggedIn] = useState ('')
    const [loginLoading, setLoginLoading] = useState(false)

    const handleInfo = (e)=> {
      const {name, value} = e.target
      setLoginInfo({...loginInfo, [name]:value})
    }

    const handleSubmit = async (e) =>{
      setLoginLoading(true)
      e.preventDefault()
      await axios.post('http://localhost:3001/login', loginInfo)
      .then(res => {
        alert(res.data)
        setLoginLoading(false)
      }).catch(error =>{
        setServerError(error.response.data)
        setLoginLoading(false)
      }) 
    }

    return (
    <motion.div
    className="cheker"
    initial={{ opacity: 0.25, }}
    animate={{ opacity: 1}}
    transition = {{ duration:1 }}
    >
        <div className='space'>
        <h1 className='signup-title' style= {option ? active: inactive} onClick = {()=> setOption(true)}>Sign Up</h1>
        <h1 className='signup-title' style= {option ? inactive: active} onClick={()=> setOption(false)}>Sign In</h1>
        </div>
        {serverError && <Alert variant='filled' severity="secondary" onClose={()=>setServerError('')}>{serverError}</Alert>}
        <div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-username-container">
                    <h3>Username</h3>
                    <label className="class">
                            <input
                            type="text" 
                            name="login_username" 
                            onChange={handleInfo} 
                            style={{width:'100%'}}
                            />
                    <PersonIcon style={{fontSize:'25px', marginBottom:'5px', color:'rgb(198, 196, 196)'}}/>
                    </label>
                </div>
                <div className='login-password-container'>
                    <h3>Password</h3>
                    <label className="class">
                            <input 
                            type="password" 
                            name="login_password" 
                            onChange={handleInfo} 
                            style={{width:'100%'}}
                            />
                    <LockIcon style={{fontSize:'25px', marginBottom:'5px', color:'rgb(198, 196, 196)'}}/>
                    </label>
                </div>
                <div className="submit-section">
                <Button variant="contained" color="secondary" type = "submit">Login</Button>
                <span>{loginLoading && <CircularProgress color="inherit" />}</span>
                </div>
            </form>
        </div>
    </motion.div>
    )
}