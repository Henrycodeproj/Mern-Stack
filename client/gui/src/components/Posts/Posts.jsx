import "../Posts/posts.css"
import {useState, useContext} from "react"
import { accountContext } from "../Contexts/appContext"
import axios from "axios"
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Picker from 'emoji-picker-react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {Button} from "@mui/material";

import * as React from 'react';
import Popover from '@mui/material/Popover';


export const Posts = ()=>{

    const [status, setStatus] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);

    const {user, posts, setPosts} = useContext(accountContext)


    const formHandler = (e) => {
        console.log(e.target.value)
        e.preventDefault()
        axios.post("http://localhost:3001/posts",{
            user:user.id,
            post:status,
        }).then(res=>{
            setPosts(res.data.data)
            setStatus('')
        })
        .catch(err=>console.log(err))
    };

    const onEmojiClick = (event, emojiObject) => {
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
    const id = open ? 'simple-popover' : undefined;


    if (user === null) return <div>loading...</div>

    return (
        <div className="add_post_container">
            <img src = "https://booleanstrings.com/wp-content/uploads/2021/10/profile-picture-circle-hd.png" className ="input_picture">
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
                            <div>
                                <SentimentSatisfiedAltIcon className="emoji_select" title = "Emojis" variant="contained" onClick={handleClick}>
                                </SentimentSatisfiedAltIcon>
                                <Popover
                                //   id={id}
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
                            </div>
                    <Button 
                    variant="contained"
                    color = "secondary"
                    onClick={(e) => formHandler(e)}>
                    Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}
