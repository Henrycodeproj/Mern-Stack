import logo from '../../images/logo.png'
import {Button} from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { accountContext } from '../Contexts/authentication'
import NotificationsIcon from '@mui/icons-material/Notifications';

export const Navbar = () =>{

    const navigateTo = useNavigate()

    const {userStatus} = useContext(accountContext)

    const logoutHandler = () => {
        localStorage.removeItem("userStatus")
        localStorage.removeItem("Token")
        localStorage.removeItem("User")
        navigateTo("/")
    }

    if (userStatus){
        return(
            <nav>
            {!userStatus? 
            <img className ="unplug_logo" src ={logo} alt ="logo" onClick={()=> navigateTo("/")}/>
            :
            <img className ="unplug_logo" src ={logo} alt ="logo" onClick = {()=> navigateTo("/display", {replace:true})}/>}

            <ul className="list-container">
                <NotificationsIcon/>
                <div>
                    <Button 
                    className = "nav_buttons" 
                    variant = "contained" 
                    color ="secondary" 
                    onClick={()=> navigateTo("/profile")}
                    sx = {{mr:2}}
                    >
                    Profile
                    </Button>
                </div>
                <div>
                    <Button
                    className = "nav_buttons" 
                    variant = "contained" 
                    sx={{
                        mr:2, 
                        color: 'white',
                        backgroundColor: 'rgb(220, 133, 244, .8)',
                        borderColor: '' 
                    }}
                    onClick={logoutHandler}>Logout
                    </Button>
                </div>
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