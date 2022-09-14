import "../Posts/posts.css"
import {useState, useContext} from "react"
import { accountContext } from "../../Contexts/appContext";
import axios from "axios"
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Picker from 'emoji-picker-react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {Button} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import * as React from 'react';
import Popover from '@mui/material/Popover';


export const Posts = ({lastPostIndex, setLastPostIndex})=>{

    const [status, setStatus] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);

    const {user, setPosts} = useContext(accountContext)


    const formHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/posts",{
            user:user.id,
            post:status,
        })
        .then(res => {
            setPosts(prevPosts => [res.data.newestPost, ...prevPosts])
            setLastPostIndex(lastPostIndex + 1)
            setStatus('')
        })
        .catch(err=>console.log(err))
    }

    const onEmojiClick = (emojiObject) => {
        setStatus(status + emojiObject.emoji)
    };


    //testing

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);


    if (user === null) return <div>loading...</div>

    return (
        <div className="add_post_container">
            <img className ="input_picture" src = "https://images.pexels.com/photos/1844547/pexels-photo-1844547.jpeg?auto=compress&cs=tinysrgb&w=1600" >
            </img>
            <div className = "post_form_container">
                <div className="post_form">
                    <TextareaAutosize
                    className="buss"
                    placeholder={`Hi ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, what are you doing on campus today?`}
                    onChange = {(e) => setStatus(e.target.value)}
                    value = {status}
                    />
                </div>
                <div className="bottom_posts_container">
                        <div className="bottom_icon_bar_wrapper">
                            <div className="input_icons_bar">
                                <div style = {{display:"flex", alignItems:"center"}}>
                                <SentimentSatisfiedAltIcon className="emoji_select" title = "Emojis" variant="contained" onClick={handleClick}/>
                                    <span style={{marginLeft:5}}>
                                        <h3 style = {{color:"black"}} className="emoji_title">Emojis</h3>
                                    </span>
                                </div>
                                <Popover
                                  open={open}
                                  anchorEl={anchorEl}
                                  onClose={handleClose}
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                  }}
                                >
                                <Picker 
                                onEmojiClick={onEmojiClick}
                                />
                                </Popover>
                                <AddPhotoAlternateIcon/>
                                <LocationOnIcon/>
                            </div>
                        </div>
                    <Button 
                    variant="contained"
                    color = "secondary"
                    onClick={status ? (e) => formHandler(e): null}>
                    Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}
