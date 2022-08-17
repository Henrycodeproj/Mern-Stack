import logo from '../../images/logo.png'
import {Button} from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { accountContext } from '../Contexts/authentication'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import "../navigation/navbar.css"

export const Navbar = () =>{

    const navigateTo = useNavigate()
    const {userStatus} = useContext(accountContext)

    const [profile, setProfile] = useState(null)

    const logoutHandler = () => {
        localStorage.removeItem("userStatus")
        localStorage.removeItem("Token")
        localStorage.removeItem("User")
        navigateTo("/")
    }

    const open = Boolean(profile)

    const openProfile = (e) =>{
        setProfile(e.currentTarget)
    }
    const closeProfile = () =>{
        setProfile(null)
    }

    console.log(profile)

    if (userStatus){
        return(
            <nav>
            <img className ="unplug_logo" src ={logo} alt ="logo" onClick={()=> !userStatus ? navigateTo("/"): navigateTo("/display")}/>

            <div className="profile_section">
                <NotificationsIcon/>
                <div>
                    <Avatar 
                    src ="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" 
                    className='faker1' 
                    onClick = {openProfile}>
                    </Avatar>
                    <Menu
                        id="basic-menu"
                        anchorEl={profile}
                        open={open}
                        onClose={closeProfile}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={closeProfile} sx={{ justifyContent: 'space-between' }}>Profile</MenuItem>
                        <MenuItem sx={{ justifyContent: 'space-between' }} onClick={()=>logoutHandler()}>
                            <LogoutIcon/>
                                Logout
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </nav>
        )
    }
    
    return(
        <nav>
            {!userStatus? <img className ="unplug_logo" src ={logo} alt ="logo" onClick={()=>navigateTo("/")}/>
            :<img className ="unplug_logo" src ={logo} alt ="logo" onClick = {()=>navigateTo("/display")}/>}
            <div className="profile_section">
                <div><Button variant = "contained" color ="secondary">Contact</Button></div>
            </div>
        </nav>
    )
}