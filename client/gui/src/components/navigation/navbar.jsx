import logo from '../../images/logo.png'
import {Button} from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { accountContext } from '../Contexts/authentication'

export const Navbar = () =>{

    const navigateTo = useNavigate()

    const {userStatus, setUserStatus} = useContext(accountContext)

    const logoutHandler = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("Token")
        navigateTo("/")
    }
    
    if (userStatus){
        return(
            <nav>
            {!userStatus? <img className ="unplug_logo" src ={logo} alt ="logo" onClick={()=> navigateTo("/")}/>
            :<img className ="unplug_logo" src ={logo} alt ="logo" onClick = {()=> navigateTo("/display", {replace:true})}/>}

            <ul className="list-container">
                <li><Button variant = "contained" color ="secondary" >Profile</Button></li>
                <li>
                    <Button variant = "contained" 
                    sx={{ color: 'white', backgroundColor: 'rgb(220, 133, 244, .8)', borderColor: '' }}
                    onClick={logoutHandler}>Logout
                    </Button>
                </li>
            </ul>
        </nav>
        )
    }
    
    return(
        <nav>
            {!userStatus? <img className ="unplug_logo" src ={logo} alt ="logo" onClick={()=>navigateTo("/")}/>
            :<img className ="unplug_logo" src ={logo} alt ="logo" onClick = {()=>navigateTo("/display")}/>}
            <ul className="list-container">
                <li><Button variant = "contained" color ="secondary">Contact</Button></li>
            </ul>
        </nav>
    )
}