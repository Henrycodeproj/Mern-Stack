import { createContext, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios'

export const modalItems = createContext()

export const ModalFiles = ({children}) => {

    const style = {
        width:'20px',
        height:'20px',
        color:'gray',
        padding:'5px',
        borderRadius:'50%',
        // borderStyle:'solid',
        // background:'#E3E2E1',
        margin:'5px',
        boxSizing:'borderBox'
      }
      //modal for login
      const [open, setOpen] = useState(false);
  
      const [loginInfo, setLoginInfo] = useState({
        login_username:"",
        login_password:""
      })
  
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
  
      const handleInfo = (e)=> {
        const {name, value} = e.target
        setLoginInfo({...loginInfo, [name]:value})
      }
  
      const handleSubmit = async (e) =>{
        console.log(loginInfo)
        e.preventDefault()
        await axios.post('http://localhost:3001/login', loginInfo)
        .then(res => {
          console.log(res.data)
        }).catch(error =>{
          console.log(error)
        }) 
      }

    return(
        <modalItems.Provider value = {{handleClose, handleOpen, open, handleSubmit}}>
        {children}
            <Dialog
              open={open}
              onClose={handleClose}
            >
                <DialogTitle>Login</DialogTitle>
                <DialogContent style = {{width:'400px', height:'400px'}}>
                <form onSubmit={handleSubmit}>
                  <div className='login-inputs' >
                    <AccountCircleIcon
                    style={style}
                    />
                    <input
                    type="text" 
                    name="login_username" 
                    onChange={handleInfo} 
                    style={{width:'100%'}}
                    placeholder = "Username"
                    />
                  </div>
                    <div className='login-inputs'>
                      <LockIcon
                      style={style}
                      />
                      <input 
                      type="password" 
                      name="login_password" 
                      onChange={handleInfo} 
                      style={{width:'100%'}}
                      placeholder="Password"/>
                    </div>
                  <Button variant='contained' color = "primary" type='submit'>Login</Button>
                </form>
                </DialogContent>
            </Dialog>
        </modalItems.Provider>
    )

}