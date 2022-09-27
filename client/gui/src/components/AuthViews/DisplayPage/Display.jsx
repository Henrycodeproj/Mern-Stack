import axios from 'axios';
import './Display.css'
import { useState, useEffect, useContext} from 'react';
import { Posts } from '../Posts/Posting.jsx';
import { accountContext } from '../../Contexts/appContext';
import { LeftColumn } from './LeftSideCol';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import { motion } from 'framer-motion';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Attending from './Attending';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { RightSideCol } from './RightSideCol';
import { MoreOptions } from './MoreOptions';
import { Truncating } from '../../ReusablesComponents/Truncating.jsx';
import { SendMessage } from './SendMessage';

export const Display = () =>{

    const {posts, setPosts, user, activeUsers, setActiveUsers, socket, dark, setDark} = useContext(accountContext)

    const [lastPostIndex, setLastPostIndex] = useState(15)
    const [loadingState, setLoadingState] = useState(true)

    useEffect(()=>{
        socket.emit("status", {userId:user.id})
        socket.on("activeUsers", (usersStatus) => {
            setActiveUsers(usersStatus)
        })
    },[])

    const handleScroll = async (e) => {

        if (e.target.clientHeight + e.target.scrollTop + 1 >= e.target.scrollHeight) {

            const URL = `http://localhost:3001/posts/getamount/${lastPostIndex}`
            const newResults = await axios.get(URL, {
                headers:{
                    "authorization":localStorage.getItem("Token")
                }
            })
            console.log(posts.includes(newResults.data[0].posterId._id))
            const filteredPosts = newResults.data.filter(newPosts => !posts.includes(newPosts.posterId._id))
            setPosts(posts.concat(filteredPosts))
            setLastPostIndex(lastPostIndex + 5)
        }
    }
    
    const likeHandler = (postID) => {
        const data = {user:user.id}
        const URL = `http://localhost:3001/posts/likes/${postID}/${lastPostIndex}`
        axios.patch(URL, data, {
            headers: {
                "authorization":localStorage.getItem("Token")
            }
        })
        .then(res => {
            setPosts(res.data)
        })
        .catch(error => console.log(error))
    }

    useEffect (()=>{
        const URL = `http://localhost:3001/posts/amount/${lastPostIndex}/`
        axios.get(URL, {
            headers:{
                "authorization":localStorage.getItem("Token")
            }
        })
        .then(res => setPosts(res.data))
        .catch(err => console.log(err))
    },[])

    if (posts === null) return (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingState}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )

    return (
        <div className='display_container' >
            <div className='display_newsfeed_wrapper'>
                <div className='left_sidebar'>
                    <LeftColumn/>
                </div>

                <div className='newsfeed_container' onScroll={(e) => handleScroll(e)}>
                    <div className='outer_posts_container'>
                        <Posts
                            lastPostIndex = {lastPostIndex}
                            setLastPostIndex = {setLastPostIndex}
                        />
                    </div>
                    <div>
                        <ul>
                            { 
                            posts.length > 0 ? posts.map((post)=>

                                <li key = {post._id} className = "posts_articles">
                                    <>
                                        <Avatar src ="https://images.unsplash.com/photo-1494790108377-be9c29b29330? ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" className='faker'>
                                        </Avatar>
                                        {
                                            post.posterId._id in activeUsers
                                            &&
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
                                            <div
                                                style ={{
                                                    display:"flex",
                                                }}
                                            >
                                            {
                                                post.posterId._id !== user.id ?
                                                    <SendMessage post = {post}/>
                                                    : 
                                                    null
                                            }
                                            <MoreOptions post = {post}/>
                                            </div>
                                        </div>
    
                                        <Truncating 
                                            postDescription = {post.Description}
                                            truncateNumber = {150}
                                        />
                                        
                                        <div className='posts_icon_wrapper'>
                                            <div className='posts_icon_bar'>
                                                {
                                                 post.attending.some(attendUsers => attendUsers._id === user.id) ?
                                                    <motion.button 
                                                        whileHover={{ scale: 1.3 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        style={{ 
                                                            borderStyle:"none",
                                                            background:"transparent",
                                                            width:23,
                                                            height:23,
                                                            padding:0
                                                        }}
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
                                                        whileHover={{ scale: 1.1, rotate:-10,}}
                                                        whileTap={{ 
                                                            scale: 1.5,
                                                        }}
                                                        style={{ 
                                                            borderStyle:"none",
                                                            background:"transparent",
                                                            width:23, height:23,
                                                            padding:0
                                                        }}
                                                    >
                                                        <Tooltip 
                                                        title = "Attend"
                                                        TransitionComponent={Zoom}
                                                        >   
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
                                                style={{ display:"flex", alignItems:"center !important"}}
                                                initial = {{ opacity:.10, x:-10 }}
                                                animate = {{ opacity:1, x:0 }}
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
