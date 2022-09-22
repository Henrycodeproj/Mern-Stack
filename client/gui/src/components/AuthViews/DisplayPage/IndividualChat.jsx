import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import Tooltip from "@mui/material/Tooltip";
import ChatIcon from '@mui/icons-material/Chat';
import {useState, useContext, useEffect} from "react"
import { accountContext } from '../../Contexts/appContext';
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import "./IndividualChat.css"
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';


export const IndividualChats = ({recievingUserInfo, convoId}) => {
    const {user, socket} = useContext(accountContext)

    const [chatAnchor, setChatAnchor] = useState(null);
    const [chatHistory, setChatHistory] = useState([])
    const [message, setMessage] = useState('')
    const [notification, setNotification] = useState(0)
    const [chatOpen, setChatOpen] = useState(false)

    const open = Boolean(chatAnchor);
    const data = {
        chatId:convoId,
        message:message,
        senderId:user.id,
        recipientId:recievingUserInfo._id
    }

    useEffect(()=> {
        socket.on(`${convoId}`, (recievedMessageData) => {
            setChatHistory(newMessage => [...newMessage, recievedMessageData])
            console.log(chatOpen)
            if (chatOpen === false) {
                setNotification(prevNotification => prevNotification + 1)
            }
        })
    },[])

    const sendChatMessage = async (data) =>{
        const Url = "http://localhost:3001/message/send"
        const response = await axios.post(Url, data, {
          headers:{
            "authorization":localStorage.getItem("Token")
          }
        })

    }

    const handleClick = async (event) => {
        setNotification(0)
        setChatAnchor(event.currentTarget);
        const Url = `http://localhost:3001/message/conversation/${convoId}`
        const response = await axios.post(Url, {
            headers:{
                "authorization":localStorage.getItem("Token")
            },
        })
        console.log(chatOpen,1)
        setChatHistory(response.data)
    };
  
    const handleChatClose = () => {
        setChatAnchor(null);
        setChatOpen(false)
    };
    
    const handleReplySubmit = async (e) =>{
        if (e.key === "Enter") {
            await sendChatMessage(data)
            socket.emit("sendUserId", data)
            setChatHistory(newMessage => [...newMessage, data])
            setMessage("")
        }
    }

    
    return (
      <>
        <Tooltip title ="Chat">
            <Badge badgeContent={notification} color="primary">
                <ChatIcon onClick = { handleClick} sx = {{ color:"gray", cursor:"pointer", fontSize:"1.7rem" }}/>
            </Badge>
        </Tooltip>
        <Popover
        open={ open }
        className = "chat_tabs"
        anchorEl={chatAnchor}
        onClose={ handleChatClose }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        >
        {
        chatHistory.length === 0 ? <CircularProgress/> :
            <> 
            <Typography variant="h6">{recievingUserInfo.username}</Typography>
            <div style= {{ padding: '16px', height:"300px", overflowY:"scroll", display:"flex", flexDirection:"column", justifyContent:"space-between"}} className = "message-out">
                <div className='Message_container'>
                    {chatHistory.map((message) =>
                        message.senderId === user.id ?
                        <div className = "currentUser_message_wrapper">
                            <div className='currentUser_message'>
                                {message.message}
                            </div>
                            <Avatar src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBMYLhvdVc5YocrrSJpyYXnb274TDj50OZQ&usqp=CAU"
                            />
                        </div>
                        :
                        <div className = "otherUser_message_wrapper">
                            <Avatar src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVY-iEh_KAqonOvgpFX8keZ3qd_l4TwwfoPA&usqp=CAU"/>
                            <div className='otherUser_message'>
                                {message.message}
                            </div>
                        </div>
                    )}
                </div>
                </div>
                    <input type="text"
                    className='input_messages' 
                    placeholder='Reply' 
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown = {e => handleReplySubmit(e)}
                    value = {message}
                    />
                </>   
            }
        </Popover>
    </>
  )
}
