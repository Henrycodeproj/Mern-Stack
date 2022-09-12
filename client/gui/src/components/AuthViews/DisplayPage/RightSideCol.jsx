import axios from "axios"
import {useState, useEffect} from "react"
import "./RightSideCol.css"
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from "@mui/material/Tooltip";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatIcon from '@mui/icons-material/Chat';

export const RightSideCol = () => {
    const [popularPosts, setPopularPosts] = useState([])
    const [attendingUsers, setAttendingUsers] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(()=>{
        const url = "http://localhost:3001/posts/popular"
        axios.get(url, {
            headers:{
                "authorization":localStorage.getItem("Token")
            }
        })
        .then(res => {
            console.log(res.data)
            setPopularPosts(res.data)
        })
        .catch(err => console.log(err))
    },[])

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);

  return (
    <div className = "right_column_wrapper">
        <div className = "popular_container">
            <h2 style = {{marginBottom:"10px"}}>Biggest Events Today</h2>
            {popularPosts.map((post)=> 
                <div>
                    <Divider/>
                    <div className = "popular_post_container">
                        <div style = {{display:"flex"}}>
                        <Avatar sx = {{marginRight:"10px"}}src = "https://dvyvvujm9h0uq.cloudfront.net/com/articles/1525891879-379720-warren-wong-242286-unsplashjpg.jpg"/>
                            <div>
                                <h3 style = {{textTransform:"capitalize", color:"black", margin:0}}>{post.original_poster[0].username}</h3>
                                {post.Description.substring(0,50).length >= 50 ?
                                    <div>
                                    {post.Description.substring(0, 50)}
                                    <span style = {{cursor:"pointer", fontWeight:900}} onClick={handleClick}>...</span>
                                    </div>
                                    :
                                    post.Description.substring(0, 50)
                                }
                            </div>
                        </div>
                        <Avatar onClick={handleClick} sx = {{background:'rgba(80, 80, 80, 0.4)', cursor:"pointer", borderStyle:"solid"}}>+{post.attendingLength}</Avatar>
                    </div>
                </div>
            )}
        </div>
        <div className="recent_message_container">
            <div className="recent_message_title">
                <h2>Recent Messages</h2>
                <Tooltip title ="Send a Message">
                <SendIcon className = "send_message_icon" sx = {{fontSize:"25px", color:"rgb(68, 68, 68)", cursor:"pointer"}}/>
                </Tooltip>
            </div>
            <div className = "recent_message_avatars">
                <div style = {{display:"flex", alignItems:"center"}}>
                    <div>
                        <Avatar sx = {{marginRight:"10px"}}src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlJTIwcG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"/>
                        <div className="recent_message_online"></div>
                    </div>
                    <h3 className="recent_message_names">Jacky</h3>
                </div>
                <Tooltip title ="Chat">
                <ChatIcon sx = {{color:"gray", cursor:"pointer"}}/>
                </Tooltip>
            </div>
            <div className = "recent_message_avatars">
                <div style = {{display:"flex", alignItems:"center"}}>
                    <div>
                        <Avatar sx = {{marginRight:"10px"}}src = "https://i.pinimg.com/750x/26/12/73/261273da88b3732c008a871d0284642b.jpg"/>
                        <div className="recent_message_online"></div>
                    </div>
                    <h3 className="recent_message_names">Vicky</h3>
                </div>
                <Tooltip title ="Chat">
                <ChatIcon sx = {{color:"gray", cursor:"pointer"}}/>
                </Tooltip>
            </div>
            <div className = "recent_message_avatars">
                <div style = {{display:"flex", alignItems:"center"}}>
                    <div>
                        <Avatar sx = {{marginRight:"10px"}}src = "https://www.lensrentals.com/blog/media/2020/03/Zach-Sutton-Beauty-Photograph-1.jpg"/>
                        <div className="recent_message_online"></div>
                    </div>
                    <h3 className="recent_message_names">Emily</h3>
                </div>
                <Tooltip title ="Chat">
                <ChatIcon sx = {{color:"gray", cursor:"pointer"}}/>
                </Tooltip>
            </div>
            <div className = "recent_message_avatars">
                <div style = {{display:"flex", alignItems:"center",justifyContent:"center"}}>
                    <div>
                        <Avatar sx = {{marginRight:"10px"}}src = "https://expertphotography.b-cdn.net/wp-content/uploads/2020/05/photo-of-woman-wearing-yellow.jpg"/>
                        <div className="recent_message_online"></div>
                    </div>
                    <h3 className="recent_message_names">Fiona</h3>
                </div>
                <Tooltip title ="Chat">
                <ChatIcon sx = {{color:"gray", cursor:"pointer"}}/>
                </Tooltip>
            </div>
        </div>
    </div>
  )
}
