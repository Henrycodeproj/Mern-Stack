
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { accountContext } from "../../Contexts/appContext"
import "./profile.css"
import { Avatar } from "@mui/material"
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

export const Profile = ()=> {
    const { user } = useContext(accountContext) 
    const { userId } = useParams()
    const navigateTo = useNavigate()

    const[viewedUser, setViewedUser] = useState(null)

    useEffect(()=>{
        const URL = `http://localhost:3001/user/information/${userId}`
        axios.get(URL,{
            headers:{
                "authorization": localStorage.getItem("Token")
            }
        })
        .then(res => setViewedUser(res.data))
        .catch(err => console.log(err))
    },[])

    /*
                {
              viewedUser._id !== user.id ? 
                <div>{viewedUser.username}'s Dashboard</div>
                : 
                <div>Hello {viewedUser.username} this is your dashboard.</div>
            }
     */
            // <div className="social_media_bar">
            // <LinkedInIcon sx = {{fontSize:"30px", color:"#0072b1"}}/>
            // <InstagramIcon sx = {{fontSize:"30px", color:"#bc2a8d"}} className ="instagram"/>
            // <FacebookIcon sx = {{fontSize:"30px", color:"#4267B2"}}/>
            // <TwitterIcon sx = {{fontSize:"30px", color:"#00acee"}}/>
            // </div>
    return(
        <>
        {viewedUser &&
            <div className="profile_background">
                <div className="outer_profile_container">
                    <div style = {{display:"flex", justifyContent:"flex-start", alignItems:"center", gap:'30%'}}>
                        <div className="Profile_picture_section">
                            <Avatar sx = {{width:'250px', height:'250px', borderStyle:"solid", borderColor:"white",     borderRadius:"50%", borderWidth:'5px'}} src = "https://cdn.mos.cms.futurecdn.net/3kZ3hc2YMB6LXiPohtyfKa.jpg"/>
                            <div>
                                <h1 style = {{fontSize:'4rem'}}>Henry</h1>
                                <h4 style={{margin:"10px 0", fontSize:"1.3rem", color:"gray"}}>@Stevenson</h4>
                                <Button sx={{margin:"10px 0"}} variant="contained" endIcon={<SendIcon />}>
                                Send Message
                                </Button>
                            </div>
                        </div>
                        <div style = {{maxWidth:"350px", maxHeight:"350px", borderRadius:"20px", padding:"1rem"}}>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem>
                                  <ListItemAvatar>
                                    <Avatar>
                                      <ImageIcon />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                </ListItem>
                                <ListItem>
                                  <ListItemAvatar>
                                    <Avatar>
                                      <WorkIcon />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText primary="First Joined" secondary="Jan 7, 2014" />
                                </ListItem>
                                <ListItem>
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
                        <h1>A Little About Me...</h1>
                        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, ratione quo! Quibusdam, dolor. Repellat labore iste tempora necessitatibus, tempore at. Iure, excepturi? Tempore dolor eaque cupiditate, eveniet quisquam officiis, assumenda quam, sapiente nisi praesentium aliquid deserunt totam nulla numquam! Nobis distinctio repellat ab velit quam optio expedita voluptatum reiciendis necessitatibus quibusdam perspiciatis in maxime quaerat explicabo, nisi nihil cumque enim, amet deleniti iusto numquam ex debitis eius! Voluptate molestiae iste inventore numquam libero asperiores dolorum consectetur minima, eum et totam, quaerat earum facere. Vero enim harum qui, ex dolorem veritatis, placeat perferendis consequatur dolor optio assumenda. Dicta expedita omnis iusto beatae ullam reprehenderit, quam numquam tenetur quos excepturi quidem et rem harum natus optio. Maiores rem tempora quis iure, recusandae quos accusantium facere incidunt est esse officiis natus sed molestiae quibusdam in, quam, adipisci soluta dolore non voluptates totam vel? Vero corporis libero modi adipisci, dicta sunt distinctio obcaecati expedita!
                        </p>
                    </div>
                    <div>
                    <h1 className="Connect_title">Connect With Me</h1>
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
