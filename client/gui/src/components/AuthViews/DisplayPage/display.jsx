import axios from 'axios';
import './display.css'
import { useState, useEffect, useRef, useContext} from 'react';
import { Posts } from '../Posts/Posts.jsx';
import { accountContext } from '../../Contexts/appContext';
import { LeftColumn } from './leftSideCol';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import { motion } from 'framer-motion';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Attending from './attending';
import io from "socket.io-client"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LogoutIcon from '@mui/icons-material/Logout';
import { RightSideCol } from './RightSideCol';

export const Display = () =>{

    const {posts, setPosts, user, activeUsers, setActiveUsers} = useContext(accountContext)
    const ref = useRef()
    const socket = io.connect("http://localhost:3001")

    const [lastPostIndex, setLastPostIndex] = useState(15)

    const handleScroll = (e) => {
        if (e.target.clientHeight + e.target.scrollTop + 1 >= e.target.scrollHeight) {

            const URL = `http://localhost:3001/posts/amount/${lastPostIndex + 5}`
            axios.get(URL, {
                headers:{
                    "authorization":localStorage.getItem("Token")
                }
            })
            .then(res =>{
                const fetchedPosts = []
                res.data.forEach((post) => fetchedPosts.push(post))
                if (fetchedPosts.length >= lastPostIndex) {
                    setPosts(fetchedPosts)
                    setLastPostIndex(lastPostIndex + 5)
                }
            }).catch(error => console.log(error))
        }
    }
    
    const likeHandler = (postID) => {
        const data = {user:user.id}
        const URL = `http://localhost:3001/posts/likes/${postID}/${lastPostIndex}`
        axios.patch(URL, data, {
            headers: {
                "authorization":localStorage.getItem("Token")
            },
        })
        .then(res => {
            console.log(res.data)
            setPosts(res.data)
        })
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        const element = ref.current

        element.addEventListener("scroll", handleScroll)
        
        return () => element.removeEventListener("scroll", handleScroll);
    },[])

    //get current posts
    useEffect (()=>{
        const URL = `http://localhost:3001/posts/amount/${lastPostIndex}`
        axios.get(URL, {
            headers:{
                "authorization":localStorage.getItem("Token")
            }
        })
        .then(res => {
            setPosts(res.data)
        })
        .catch(err => console.log(err))
    },[])

    //sends socket information
    useEffect(()=>{
        socket.emit("status", {userId:user.id})
        socket.on("activeUsers", (userStatus) => {
            setActiveUsers(userStatus)
        })
    },[])

    return (
        <div className='display_container' >
            <div className='display_newsfeed_wrapper'>
                <div className='left_sidebar'>
                    <LeftColumn/>
                    <div sx = {{height:"150px"}}>
                    <LogoutIcon sx ={{color:"white", padding:"5px", fontSize:"25px", backgroundColor:"rgba(128, 128, 128, 0.299)", borderRadius:"50%"}}/>
                    </div>
                </div>

                <div className='newsfeed_container' ref = {ref}>
                    <div className='outer_posts_container'>
                        <Posts/>
                    </div>
                    <div>
                        <ul>
                            {
                            posts.length > 0 ? posts.map((post)=>
                                <li key = {post._id} className = "posts_articles">
                                    <>
                                    {/*<img src ="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" className='faker'>
                                    </img> */}
                                    <Avatar src ="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" className='faker'>
                                    </Avatar>
                                    {activeUsers.some(activeUser => activeUser.userId === post.posterId._id) &&
                                    <Tooltip title="Online">
                                        <span className='online'/>
                                    </Tooltip>
                                    }
                                    </>
                                    <div className='inner_post_container'>
                                        <div className ="title_wrapper">
                                            <h4 style={{textTransform:"capitalize"}}>
                                            {post.posterId.username}
                                            </h4>
                                            <MoreHorizIcon sx ={{cursor:"pointer"}}/>
                                        </div>
    
                                        <p style={{whiteSpace:"pre-line"}}>
                                        {post.Description}
                                        </p>

                                        <div className='posts_icon_wrapper'>
                                            <div className='posts_icon_bar'>
                                                {
                                                post.attending.some(users => users._id === user.id) ?
                                                <motion.button
                                                whileHover={{ scale: 1.3 }}
                                                whileTap={{ scale: 0.9 }}
                                                style={{ borderStyle:"none", background:"transparent", width:23, height:23, padding:0 }}
                                                >
                                                    <Tooltip title = "Unattend" TransitionComponent={Zoom}>    
                                                    <FavoriteIcon
                                                    sx = {{color:"red"}}
                                                    onClick = {()=>likeHandler(post._id)}
                                                    style = {{cursor:"pointer"}}
                                                    />
                                                    </Tooltip>
                                                </motion.button>
                                                :
                                                <motion.button
                                                whileHover={{ scale: 1.1}}
                                                whileTap={{ 
                                                    scale: 1.5,
                                                    rotate:-10,
                                                }}
                                                style={{ borderStyle:"none", background:"transparent", width:23, height:23, padding:0 }}
                                                >
                                                    <Tooltip title = "Attend" TransitionComponent={Zoom}>   
                                                    <VolunteerActivismIcon
                                                    className='heart_button_outline' 
                                                    onClick = {() => likeHandler(post._id)}
                                                    style = {{cursor:"pointer"}}
                                                    />
                                                    </Tooltip>
                                                </motion.button>
                                                }
                                                <CalendarMonthIcon/>
                                                <AddToHomeScreenIcon/>
                                            </div>

                                            <motion.div 
                                            style={{display:"flex", alignItems:"center !important"}}
                                            initial = {{opacity:.10, x:-10}}
                                            animate = {{opacity:1, x:0}}
                                            transition = {{ duration:1 }}
                                            >
                                                <Attending 
                                                posting = { post }
                                                />
                                            </motion.div>
                                        </div>
                                    </div>
                                </li>
                            ):
                            <h2>There are no current listed events on campus.</h2>
                            }
                        </ul>
                    </div>
                </div>

                <div className='right_sidebar'>
                    <RightSideCol/>
                </div>
            </div>
        </div>
    )
}
