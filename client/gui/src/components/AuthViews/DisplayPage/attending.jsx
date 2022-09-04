import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useState, useEffect, useContext, useRef } from 'react';
import { accountContext } from '../../Contexts/appContext';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import "./attending.css"

import Popover from '@mui/material/Popover';


const Attending = (posting) => {

    const {user} = useContext(accountContext)
    const currentUser = user

    const [anchorEl, setAnchorEl] = useState(null);
    const [remainingUsers, setRemainingUsers] = useState([])
    const [searchUsers, setSearchUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    const post = posting.posting
    const ref = useRef()
    const open = Boolean(anchorEl);
    let currentShownUsers = 5

    const handleScroll = (e, postID) => {

        if (e.target.clientHeight + e.target.scrollTop + 1 >= e.target.scrollHeight) {
            const URL = `http://localhost:3001/posts/${postID}/attend/${currentShownUsers + 5}`
            axios.get(URL, {
                headers:{
                    "authorization":localStorage.getItem("Token")
                }
            })
            .then(res =>{
                const fetchedUsers = []
                res.data.forEach((user) => fetchedUsers.push(user))
                if (fetchedUsers.length > currentShownUsers) {
                    setRemainingUsers(fetchedUsers)
                    console.log(remainingUsers)
                    currentShownUsers += 5
                }
            }).catch(err => console.log(err))
        }
    }

    const handleClick = (event, postID) => {
        const URL = `http://localhost:3001/posts/${postID}/attend/${currentShownUsers}`
        axios.get(URL,{
            headers:{
                "authorization":localStorage.getItem("Token")
            }
        })
        .then(res => {
            setRemainingUsers(res.data)
            setSearchUsers(res.data)
        })
        .catch(err => console.log(err));

        setAnchorEl(event.currentTarget);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value)
        const results = remainingUsers.filter((user) => user.username.includes(event.target.value.toLowerCase()))
        setSearchUsers(results)
    }

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <>
        { post.attending.map((user, index) => index <= 2 ?
            <div>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover = {{ y: -10, scale: 1.3}}
            >
                <Tooltip title = {currentUser.id !== user._id && user._id ? `${user.username.charAt(0).toUpperCase() + user.username.slice(1)} is attending`:'You are attending this event'}>
                    <Avatar 
                    className = "attending_avatars" 
                    alt="Trevor Henderson" 
                    src="https://faces-img.xcdn.link/image-lorem-face-6511.jpg" 
                    />
                </Tooltip>
            </motion.div>
            </div>
            :
            <span>
                { post.attending.length - index === 1 ?
                <motion.div
                whileHover={{scale:1.15}}
                >   
                    <Tooltip title = "Show More...">
                        <Avatar
                        onClick={(event)=> handleClick(event, post._id)} 
                        sx ={{cursor:"pointer", background:"gray"}} 
                        className='remaining_users_avatar'> +{post.attending.length - 3} 
                        </Avatar>
                    </Tooltip>

                    <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    >
                    <div style={{ padding: 10, maxWidth:170, maxHeight:170, overflow:"scroll"}} onScroll={(event)=>handleScroll(event, post._id)} >

                        <div className='remaining_users_search_bar_container' style = {{ display:"flex"}}>
                            <PersonSearchIcon/>
                            <input 
                            className="remaining_users_search_bar"
                            placeholder='Search'
                            onChange={(e) => {handleSearch(e)}}
                            value = {search}
                            />
                        </div>

                        { remainingUsers && search ? 
                        <> 
                            { searchUsers.map((remainUser) =>
                                <div className = "remaining_users_container">
                                    <Avatar
                                    sx = {{ 
                                        width:35, 
                                        height:35, 
                                        marginRight:"10px",
                                    }}
                                    src="https://faces-img.xcdn.link/image-lorem-face-6511.jpg" />
                                    <h2 style = {{textTransform:"capitalize"}}>{remainUser.username}</h2>
                                </div>
                            )} 
                        </>
                        :
                        <> 
                            { remainingUsers.map((remainUser) =>
                                <div className = "remaining_users_container">
                                    <Avatar 
                                    sx = {{ 
                                        width:35, 
                                        height:35, 
                                        marginRight:"10px",
                                    }}
                                    src="https://faces-img.xcdn.link/image-lorem-face-6511.jpg" />
                                    <h2 style = {{textTransform:"capitalize"}}>{remainUser.username}</h2>
                                </div>
                            )} 
                        </> 
                        } 
                    </div>

                    </Popover>

                </motion.div>
                : null
                }
            </span>
        )}

        </>
    )
}

export default Attending

