import axios from "axios"
import {useState, useEffect, useContext} from "react"
import "./RightSideCol.css"
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from "@mui/material/Tooltip";
import ChatIcon from '@mui/icons-material/Chat';
import { accountContext } from "../../Contexts/appContext";
import { IndividualChats } from "./IndividualChat";

export const RightSideCol = () => {

    const {user} = useContext(accountContext)

    const [popularPosts, setPopularPosts] = useState([])
    const [attendingUsers, setAttendingUsers] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);

    const [recentMessages, setRecentMessages] = useState([])

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

    useEffect(()=>{
        const Url = `http://localhost:3001/message/recent/all/${user.id}`
        axios.get(Url, {
            headers:{
                "authorization":localStorage.getItem("Token")
            }
        })
        .then(res => setRecentMessages(res.data))
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
                                    {post.Description.length >= 50 ?
                                        <div>
                                        {post.Description.substring(0, 50)}
                                        <span style = {{cursor:"pointer"}} onClick={handleClick}>...</span>
                                        </div>
                                        :
                                        post.Description.substring(0, 50)
                                    }
                            </div>
                        </div>
                        <Avatar onClick={handleClick} 
                        sx = {{
                            background:'rgba(80, 80, 80, 0.4)',
                            cursor:"pointer",
                            borderStyle:"solid",
                            width:"35px",
                            height:"35px"
                        }}>
                            +{post.attendingLength}
                        </Avatar>
                    </div>
                </div>
            )}
        </div>
        <div className="recent_message_container">
            <div className="recent_message_title">
                <h2>Recent Messages</h2>
            </div>
            <div className = "recent_message_avatars">
                { 
                 recentMessages && recentMessages.map((queryInfo) => 
                    <div style = {{display:"flex", alignItems:"center", justifyContent:"space-between", height:"100%"}}>
                        <div className="profile_image_name_container">
                            <div>
                            <Avatar sx = {{marginRight:"10px"}}src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1& ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlJTIwcG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"/>
                            <div className="recent_message_online"></div>
                            </div>
                            <h3 className="recent_message_names">{queryInfo.recieverInfo[0].username}</h3>
                        </div>
                        <IndividualChats
                        recievingUserInfo = {queryInfo.recieverInfo[0]}
                        convoId = {queryInfo._id}
                        />
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}
