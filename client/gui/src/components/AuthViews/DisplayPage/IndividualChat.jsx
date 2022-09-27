import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import Tooltip from "@mui/material/Tooltip";
import ChatIcon from '@mui/icons-material/Chat';
import {useState, useContext, useEffect, useRef} from "react"
import { accountContext } from '../../Contexts/appContext';
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import "./IndividualChat.css"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export const IndividualChats = ({recievingUserInfo, convoId, isNewMessage}) => {
    const {user, socket} = useContext(accountContext)

    const [chatAnchor, setChatAnchor] = useState(false);
    const [chatHistory, setChatHistory] = useState([])
    const [message, setMessage] = useState('')
    const [notification, setNotification] = useState(0)
    const [newMessages, setNewMessages] = useState(false)
    const [ownMessage, setOwnMessage] = useState(false)

    const open = Boolean(chatAnchor);
    const chatOpen = useRef()
    const chatContainer = useRef()
    const chatClicked = useRef()
    const chatLoad = useRef()

    const data = {
        chatId:convoId,
        message:message,
        senderId:user.id,
        recipientId:recievingUserInfo._id
    }

    useEffect(()=> {
        socket.on(`${convoId}`, recievedMessageData => {
            console.log(recievedMessageData)
            setNewMessages(true)
            setChatHistory(newMessage => [...newMessage, recievedMessageData]);
            if (chatOpen.current === false) setNotification(prevNotifications => prevNotifications + 1)
        })
    },[])

    useEffect(()=>{
        chatOpen.current = false
        if (isNewMessage) setNotification(prevNotifications => prevNotifications + 1)
    },[])
    useEffect(()=>{

    })
    useEffect(()=>{
        if (chatContainer.current) chatContainer.current.scrollIntoView({behavior: "smooth"})
        setOwnMessage(false)
    }, [ownMessage])

    const handleNewMessageScroll = () =>{
        console.log(chatContainer.current.clientHeight, chatContainer.current.scrollTop, chatContainer.current.scrollHeight)
        if (chatContainer.current) chatContainer.current.scrollIntoView({behavior: "smooth"})
        setNewMessages(false)
    }

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
        chatOpen.current = true
        chatClicked.current = true
        setChatAnchor(event.currentTarget);
        const Url = `http://localhost:3001/message/conversation/${convoId}`
        const response = await axios.post(Url, {
            headers:{
                "authorization":localStorage.getItem("Token")
            },
        })
        setChatHistory(response.data)
    };
    
    const handleChatClose = () => {
        setChatAnchor(false);
        chatOpen.current = false
        chatClicked.current = false
    };
    
    const handleReplySubmit = async (e) =>{
        if (e.key === "Enter") {
            sendChatMessage(data)
            socket.emit("sendUserId", data)
            setChatHistory(newMessage => [...newMessage, data])
            setMessage("")
            setOwnMessage(true)
        }
    }
    
    return (
      <>
        <Tooltip title ="Chat">
            <Badge badgeContent={notification} color="primary" style = {{minWidth:'15px', height:"15px"}}>
                <ChatIcon onClick = { handleClick } sx = {{ color:"gray", cursor:"pointer", fontSize:"1.7rem" }}ref = {chatClicked}/>
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
        ref = {chatLoad}
        >
        {
        chatHistory.length === 0 ? <CircularProgress/> :
            <> 
            <div className='chat_box_wrapper'>
                <div style = {{display:"flex", gap:"10px", alignItems:"center"}}>
                <Avatar src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOCLcCD0l0PpNGuRAmtNh47ovGB3c_a59DPQ&usqp=CAU"
                sx ={{width:"30px", height:"30px"}}
                />
                <h2 style ={{fontWeight:"600"}}>{recievingUserInfo.username}</h2>
                </div>
                <div style ={{display:"flex", flexDirection:"row"}}> 
                {
                newMessages && 
                <>
                    <div>
                        <Tooltip title = "New Message(s)">
                        <NotificationsActiveIcon className='active_newchat_bell' sx = {{color:"red"}} onClick = {handleNewMessageScroll}/>
                        </Tooltip>
                    </div> 
                </>
                }
                </div>
            </div>

            <div style= {{ padding: '16px', height:"300px", minWidth:"332px", overflowY:"scroll", display:"flex", flexDirection:"column", justifyContent:"space-between"}} className = "message-out">
                <div className='Message_container'>
                    {chatHistory.map((message) =>
                        message.senderId === user.id ?
                        <div className = "currentUser_message_wrapper">
                            <div className='currentUser_message' ref = {el => chatContainer.current = el}>
                                {message.message}
                            </div>
                            <Avatar src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBMYLhvdVc5YocrrSJpyYXnb274TDj50OZQ&usqp=CAU"
                            />
                        </div>
                        :
                        <div className = "otherUser_message_wrapper">
                            <Avatar src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVY-iEh_KAqonOvgpFX8keZ3qd_l4TwwfoPA&usqp=CAU"/>
                            <div className='otherUser_message' ref = {el => chatContainer.current = el}>
                                {message.message}
                            </div>
                        </div>
                    )}
                </div>
                <div>
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
