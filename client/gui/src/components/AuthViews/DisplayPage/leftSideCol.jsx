import { Avatar } from "@mui/material"
import { accountContext } from "../../Contexts/appContext"
import { useContext, useState, useEffect, useRef } from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SettingsIcon from '@mui/icons-material/Settings';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import Divider from '@mui/material/Divider';
import "./LeftSideCol.css"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export const LeftColumn = ()=>{
    const {user} = useContext(accountContext)

    const ref = useRef()


    useEffect(() => {
        const element = ref.current

        function handleResize(element) {
            console.log('resized to: ', element.offsetWidth, 'x', element.offsetHeight)
        }
    
        element.addEventListener('resize', handleResize(element))

        return () => element.removeEventListener("resize", handleResize);
    })

    return(
        <div className='side_header' ref={ref}>
            <div className="leftside_profile_card" style={{background:"rgba(139, 137, 137, 0.404)",borderTopLeftRadius:'5px', borderTopRightRadius:'5px'}}>
                <Avatar sx = {{ width:50, height:50 }} src ="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" >
                </Avatar>
                <span className='leftsidebar_online'/>
                <div className = "leftside_profile_card_name">
                    <h2 style={{textTransform:"capitalize"}}>{user.username}</h2>
                    <h4>Henry@email.com</h4>
                </div>
            </div>
        <MenuList sx ={{borderTop:"solid", borderTopColor:"rgb(255, 255, 255, .6)", borderTopWidth:"1.5px", padding:'10px'}}>
            <MenuItem sx = {{margin:"10px 0px"}} className = "leftsidebar_menuItems">
              <ListItemIcon sx ={{color:"white"}}>
                <InboxIcon fontSize="small"/>
              </ListItemIcon>
              <ListItemText sx ={{color:"white"}} className= "list_item_text">Inbox</ListItemText>
              <Typography variant="body2" sx ={{color:"white"}}>
              </Typography>
            </MenuItem>
            <MenuItem sx = {{margin:"10px 0px"}} className = "leftsidebar_menuItems">
              <ListItemIcon sx ={{color:"white"}}>
                <DraftsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText sx ={{color:"white"}} className= "list_item_text">Message</ListItemText>
              <Typography variant="body2" sx ={{color:"white"}}>
              </Typography>
            </MenuItem>
            <MenuItem sx = {{margin:"10px 0px"}} className = "leftsidebar_menuItems">
              <ListItemIcon sx ={{color:"white"}}>
                <PermContactCalendarIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText sx ={{color:"white"}} className= "list_item_text">Dashboard</ListItemText>
              <Typography variant="body2" sx ={{color:"white"}}>
              </Typography>
            </MenuItem>
            <MenuItem sx = {{margin:"10px 0px"}} className = "leftsidebar_menuItems">
              <ListItemIcon sx ={{color:"white"}}>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText sx ={{color:"white"}} className= "list_item_text">Settings</ListItemText>
              <Typography variant="body2" sx ={{color:"white"}}>
              </Typography>
            </MenuItem>
        </MenuList>

        </div>
    )
}

