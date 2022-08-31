import logo from '../../images/logo.png'
import {Button} from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { accountContext } from '../Contexts/appContext'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import "../navigation/navbar.css"

export const Navbar = () =>{

    const navigateTo = useNavigate()
    const {userStatus} = useContext(accountContext)

    const [profile, setProfile] = useState(null)

    const logoutHandler = () => {
        localStorage.removeItem("userStatus")
        localStorage.removeItem("Token")
        localStorage.removeItem("User")
        setProfile(false)
        navigateTo("/")
    }

    const open = Boolean(profile)
    console.log(open)

    const openProfile = (e) =>{
        setProfile(e.currentTarget)
    }
    const closeProfile = () =>{
        setProfile(null)
    }

    if (userStatus){
        return(
            <nav>

            <img className ="unplug_logo" src ={logo} alt ="logo" onClick={()=> !userStatus ? navigateTo("/"): navigateTo("/display")}/>

            <div className="profile_section">
                <Badge badgeContent={4} color="error">
                    <NotificationsIcon sx = {{fontSize:"2em", cursor:"pointer", background:"rgba(128, 128, 128, 0.393)", borderRadius:"50%", color:"#bbb5b5"}} onClick = {() => console.log('notifications')}/>
                </Badge>
                <div>
                    <IconButton
                        onClick={openProfile}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar 
                        src ="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" sx={{ width: 35, height: 35 }}
                        className='faker1'
                        >
                        </Avatar>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={profile}
                        open={open}
                        onClose={closeProfile}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                        sx = {{width:'400px'}}
                    >
                        <MenuItem sx={{ minWidth:"180px" }} 
                        onClick={()=> {closeProfile(); navigateTo("/profile", {replace:false})}}>
                            <AccountCircleIcon className='profile_menu_icon' sx={{mr:2}}/>
                                <div>Profile</div>
                        </MenuItem>
                        <MenuItem sx={{ minWidth:"180px" }} 
                        onClick={closeProfile}>
                            <SettingsIcon className='profile_menu_icon' sx={{mr:2}}/>
                                <div>Settings</div>
                        </MenuItem>
                        <MenuItem sx={{ minWidth:"180px" }} onClick={()=>logoutHandler()}>
                            <LogoutIcon className = "profile_menu_icon" sx={{mr:2}}/>
                                <div>Logout</div>
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