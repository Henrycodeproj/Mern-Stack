import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import Tooltip from "@mui/material/Tooltip";
import ChatIcon from '@mui/icons-material/Chat';
import {useState, useContext} from "react"
import { accountContext } from '../../Contexts/appContext';
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar';
import "./IndividualChat.css"

export const IndividualChats = ({recievingUserInfo, convoId}) => {
    const {user} = useContext(accountContext)

    const [chatAnchor, setChatAnchor] = useState(null);
    const [chatHistory, setChatHistory] = useState([])
    const [message, setMessage] = useState('')

    const handleClick = async (event) => {
        setChatAnchor(event.currentTarget);
        const Url = `http://localhost:3001/message/conversation/${convoId}`
        const response = await axios.post(Url, {
            headers:{
                "authorization":localStorage.getItem("Token")
            },
        })
        console.log(response.data)
        setChatHistory(response.data)
    };
  
    const handleChatClose = () => {
        setChatAnchor(null);
    };
    
    const handleReplySubmit = () =>{
        console.log(message)
    }
    
    const open = Boolean(chatAnchor);


    return (
      <>
        <Tooltip title ="Chat">
          <ChatIcon onClick = {handleClick} sx = {{color:"gray", cursor:"pointer"}}/>
        </Tooltip>
        <Popover
        open={open}
        className = "chat_tabs"
        anchorEl={chatAnchor}
        onClose={handleChatClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        >
        {
        chatHistory.length === 0 ? <CircularProgress/> :
            <> 
            <Typography variant="h6">{recievingUserInfo.username}</Typography>
            <Typography sx= {{ p: 2, height:"300px", width:"332px", overflow:"scroll", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                <div className='Message_container'>
                    {chatHistory.map((message) =>
                        message.senderId === user.id ?
                        <div className = "currentUser_message_wrapper">
                            <p className='currentUser_message'>
                                {message.message}
                            </p>
                            <Avatar src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBMYLhvdVc5YocrrSJpyYXnb274TDj50OZQ&usqp=CAU"
                            />
                        </div>
                        :
                        <div className = "otherUser_message_wrapper">
                            <Avatar src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVY-iEh_KAqonOvgpFX8keZ3qd_l4TwwfoPA&usqp=CAU"/>
                            <p className='otherUser_message'>
                                {message.message}
                            </p>
                        </div>
                    )}
                </div>
            </Typography>
                <input type="text"
                className='input_messages' 
                placeholder='Reply' 
                onChange={e => setMessage(e.target.value)}
                />
            </>   
        }
    </Popover>
    </>
  )
}
