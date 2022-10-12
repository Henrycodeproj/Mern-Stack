
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { accountContext } from "../../Contexts/appContext"
import "./profile.css"
import { Avatar, Tooltip } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AddIcon from '@mui/icons-material/Add';

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import * as React from 'react';

export const Profile = ()=> {
    const { user } = useContext(accountContext) 
    const { userId } = useParams()
    const navigateTo = useNavigate()

    const[viewedUser, setViewedUser] = useState(null)
    const[userDescription, setUserDescription] = useState(null)

    useEffect(()=>{
        const URL = `http://localhost:3001/user/information/${userId}`
        axios.get(URL,{
            headers:{
                "authorization": localStorage.getItem("Token")
            }
        })
        .then(res => {
          setViewedUser(res.data)
          setUserDescription(res.data.selfDescription)
        })
        .catch(err => console.log(err))
    },[userId])

    const submitDescription = async () => {
      const url = `http://localhost:3001/user/update/description/${user.id}`
      const data = {description: userDescription}
      const response = await axios.patch(url, data, {
        headers:{
          "authorization": localStorage.getItem("Token")
        }
      })
      setViewedUser(response.data)
      setState(prev => prev['bottom'] = !prev['bottom'])
    }
    /*
                {
              viewedUser._id !== user.id ? 
                <div>{viewedUser.username}'s Dashboard</div>
                : 
                <div>Hello {viewedUser.username} this is your dashboard.</div>
            }
     */

            const [state, setState] = useState({bottom: false});
          
            const toggleDrawer = (anchor, open) => (event) => {  
              setState({ [anchor]: open });
            };
          
            const list = (anchor) => (
              <Box
                sx={anchor === 'bottom' ? 'auto' : 250 }
                role="presentation"
                onClick={toggleDrawer(anchor, true)}
              >
                <List>
                    <ListItem>
                      <h1>Add a Description</h1>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem>
                      <TextareaAutosize
                        className = "description_box"
                        minRows= {10}
                        onChange = {e => setUserDescription(e.target.value)}
                        value = {userDescription}
                      />
                    </ListItem>
                    <ListItem>
                      <Button variant = "contained" onClick = {submitDescription}>Submit</Button>
                    </ListItem>
                </List>
              </Box>
            );        

    return(
        <>
        {viewedUser &&
            <div className="profile_background">
                <div className="outer_profile_container">
                    <div className = "top_profile_container">
                        <div className="Profile_picture_section">
                            <Avatar sx = {{width:'250px', height:'250px', borderStyle:"solid", borderColor:"white",     borderRadius:"50%", borderWidth:'5px'}} src = "https://cdn.mos.cms.futurecdn.net/3kZ3hc2YMB6LXiPohtyfKa.jpg"/>
                            <div>
                                <h1 style = {{fontSize:'4rem'}}>
                                    {
                                      viewedUser._id !== user.id ?
                                      viewedUser.username.charAt(0).toUpperCase() + viewedUser.username.slice(1)
                                      :"Your Dashboard" 
                                    }
                                </h1>
                                <h4 style={{margin:"10px 0", fontSize:"1.3rem", color:"gray"}}>@Stevenson</h4>
                                {
                                  viewedUser._id !== user.id &&
                                  <Button sx={{margin:"10px 0"}} variant="contained" endIcon={<SendIcon/>}>
                                  Send Message
                                  </Button>
                                }
                            </div>
                        </div>
                        <div className = "profile_sidebox_container" style = {{maxWidth:"350px", maxHeight:"350px", borderRadius:"20px", padding:"1rem"}}>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent' }}>
                                <ListItem className = "profile_sidebox_listItems">
                                  <ListItemAvatar>
                                    <Avatar>
                                      <ImageIcon />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                </ListItem >
                                <ListItem className = "profile_sidebox_listItems">
                                  <ListItemAvatar>
                                    <Avatar>
                                      <WorkIcon />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText primary="First Joined" secondary="Jan 7, 2014" />
                                </ListItem>
                                <ListItem className = "profile_sidebox_listItems">
                                  <ListItemAvatar>
                                    <Avatar>
                                      <BeachAccessIcon />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText primary="Last Seen Online" secondary="July 20, 2014" />
                                </ListItem>
                            </List>
                        </div>
                    </div>
                    <div>
                        <div style ={{display:"flex", alignItems:"center", gap:"10px"}}>
                        <h1>A Little About Me</h1>
                          {viewedUser._id === user.id &&
                          <div>
                            {['bottom'].map((anchor) => (
                              <React.Fragment key={anchor}>
                                <Tooltip title = "Add/Change Self Description">
                                  <EditIcon className = "About_Me_Edit_Button" onClick={toggleDrawer(anchor, true)} sx = {{fontSize:"1.7rem", cursor:"pointer"}}/>
                                </Tooltip>
                                <SwipeableDrawer
                                  anchor={anchor}
                                  open={state[anchor]}
                                  onClose={toggleDrawer(anchor, false)}
                                  onOpen={toggleDrawer(anchor, true)}
                                >
                                  {list(anchor)}
                                </SwipeableDrawer>
                              </React.Fragment>
                            ))}
                          </div>
                          }
                        </div>
                        <div className = "profile_page_description" style = {{lineHeight:"2rem", fontSize:"1.2rem"}}>
                          {viewedUser.selfDescription ?
                           <div>
                            <p style = {{maxHeight:"192px", overflow:"hidden"}}>{viewedUser.selfDescription}</p>
                            {
                              viewedUser.selfDescription.trim().split(' ').length > 100 && 
                              <span style ={{cursor:"pointer", fontSize:"1.7rem", fontWeight:"700"}} onClick>...</span>
                            }
                           </div>
                           : "There is no current description"
                          }
                        </div>
                    </div>
                    <div>
                      <div className = "Connect_title_bar" style = {{display:"flex", alignItems:"center", gap:"1%"}}>
                        <h1>Connect With Me</h1>
                        {
                          viewedUser._id === user.id &&
                          <AddIcon className = "add_social_button" sx = {{fontSize:"1.7rem", cursor:"pointer"}} />
                        }
                      </div>
                      <div className="social_media_bar">
                          <LinkedInIcon sx = {{fontSize:"30px", color:"#0072b1", cursor:"pointer"}}/>
                          <InstagramIcon sx = {{fontSize:"30px", color:"#bc2a8d", cursor:"pointer"}} className ="instagram"/>
                          <FacebookIcon sx = {{fontSize:"30px", color:"#4267B2", cursor:"pointer"}}/>
                          <TwitterIcon sx = {{fontSize:"30px", color:"#00acee", cursor:"pointer"}}/>
                      </div>
                    </div>
                </div>
            </div>
        }
        </>
    ) 
}

