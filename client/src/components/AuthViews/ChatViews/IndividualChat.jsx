import Popover from '@mui/material/Popover';
import axios from 'axios';
import Tooltip from "@mui/material/Tooltip";
import {useState, useContext, useEffect, useRef} from "react"
import { accountContext } from '../../Contexts/appContext';
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import "./IndividualChat.css"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SendIcon from '@mui/icons-material/Send';
import { TextAreaEmojis } from '../../ReusablesComponents/TextAreaEmojis';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { motion } from "framer-motion";
import TextareaAutosize from 'react-textarea-autosize';

export const IndividualChats = ({recievingUserInfo, convoId, isNewMessage}) => {

    const {user, socket, activeUsers } = useContext(accountContext)

    const [chatAnchor, setChatAnchor] = useState(false);
    const [chatHistory, setChatHistory] = useState([])
    const [message, setMessage] = useState('')
    const [notification, setNotification] = useState(0)
    const [newMessages, setNewMessages] = useState(false)
    const [ownMessage, setOwnMessage] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [containerMaxHeight, setContainerMaxHeight] = useState(0)
    const [individualChatAnchor, setIndividualChatAnchor] = useState(null);

    const open = Boolean(chatAnchor);
    const chatOpen = useRef()
    const chatContainer = useRef()
    const chatClicked = useRef(false)
    const textAreaRef = useRef()

    const data = {
        chatId:convoId,
        message: textAreaRef.current ? textAreaRef.current.value : '',
        senderId: user.id,
        recipientId: recievingUserInfo._id
    }

    useEffect(()=> {
        socket.on(`${convoId}`, recievedMessageData => {
            console.log(recievedMessageData)
            if (recievedMessageData.senderId !== user.id){
                setNewMessages(true)
                setChatHistory(newMessage => [...newMessage, recievedMessageData]);
            }
            if (chatOpen.current === false) setNotification(prevNotifications => prevNotifications + 1)
        })
        return () => {
            socket.removeListener(`${convoId}`);
        };
    },[])
    
    useEffect(() => {
        async function getUnreadMessages (){
            const url = `http://localhost:3001/message/unread/${convoId}/${user.id}`
            const response = await axios.get(url, {
                headers:{
                    "authorization":localStorage.getItem("Token")
                }
            })
            console.log(response.data)
            if (response.data.results >= 1) setNotification(response.data.results)
        }
      getUnreadMessages()
    },[])

    useEffect(() => {
        async function routeTest() {
            const url = `http://localhost:3001/message/unread/test`
            const data = {senderID:user.id, receiverID: recievingUserInfo._id}
            const response = await axios.post(url, data, {
                headers:{
                    "authorization":localStorage.getItem("Token")
                }
            })
        }
        routeTest()
    },[])

    useEffect(()=>{
        chatOpen.current = false
        if (isNewMessage) setNotification(prevNotifications => prevNotifications + 1)
    },[])

    //scrolls to bottom of chat on load
    useEffect(()=>{
        if (chatContainer.current && chatClicked.current) {
            chatContainer.current.scrollIntoView()
            chatClicked.current = false
        }
    }, [chatHistory])

    //scrolls to bottom when you type own message
    useEffect(()=>{
        console.log("caller")
        if (chatContainer.current) 
            chatContainer.current.scrollIntoView({behavior: "smooth"})
        setOwnMessage(false)
    }, [ownMessage])
    
    //scrolls to bottom with new message
    const handleNewMessageScroll = () => {
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
        const response = await axios.get(Url, {
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
    
    const handleReplyEnter = (event) =>{
        console.log(textAreaRef.current.value, 'text area')
        if (event.key === "Enter") {
            event.preventDefault()
            if (textAreaRef.current.value){
                console.log(data)
                sendChatMessage(data)
                socket.emit("sendUserId", data)
                setChatHistory(newMessage => [...newMessage, data])
                setMessage("")
                setOwnMessage(true)
                textAreaRef.current.value = ''
            }
        }
    }
    
    const handleReplySubmit = (event) =>{
        if (message){
            sendChatMessage(data)
            socket.emit("sendUserId", data)
            setChatHistory(newMessage => [...newMessage, data])
            setMessage("")
            setOwnMessage(true)
            textAreaRef.current.value = ''
        }
    }
    

    const handleChatScroll = async (event) => {
        setScrollPosition(event.target.clientHeight + event.target.scrollTop + 1)
        if (scrollPosition >= containerMaxHeight) setNewMessages(false)
        else if (event.target.scrollTop === 0) {
            const Url = `http://localhost:3001/message/conversation/prev/${convoId}/${chatHistory.length}`
            const response = await axios.get(Url, {
                headers:{
                    "authorization":localStorage.getItem("Token")
                },
            })
            setChatHistory(prev => [...response.data, ...prev])
            if (response.data.length !== 0) event.target.scrollTop = 200
        }
    }
    
    return (
      <>
        <Tooltip title ="Chat">
            <Badge badgeContent={notification} color="primary">
                <motion.div
                whileHover={{rotate:45}}
                whileTap = {{x:5, scale:1.1}}
                >
                <CallMadeIcon onClick = { handleClick } 
                  sx = {{ color:"gray", cursor:"pointer", fontSize:"1.7rem" }}
                  className = "chat-icon"
                />
                </motion.div>
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
            <div className='chat_box_wrapper'>
                <div style = {{display:"flex", gap:"10px", alignItems:"center"}}>
                <div>
                <Avatar src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOCLcCD0l0PpNGuRAmtNh47ovGB3c_a59DPQ&usqp=CAU"
                sx ={{width:"30px", height:"30px"}}
                />
                {recievingUserInfo._id in activeUsers && <span className="chat_online"/>}
                </div>
                <h2 style ={{fontWeight:"600"}}>{recievingUserInfo.username.charAt(0).toUpperCase() + recievingUserInfo.username.slice(1)}</h2>
                </div>
                <div style ={{display:"flex", flexDirection:"row"}}> 
                {
                newMessages && scrollPosition <= containerMaxHeight && scrollPosition !== 0 && containerMaxHeight !== 0 &&
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

            <div 
            style= {{ 
                padding: '16px',
                height:"300px", 
                width:"332px", 
                overflowY:"scroll", 
                display:"flex", 
                flexDirection:"column", 
                justifyContent:"space-between"
            }}
            className = "message-out" 
            onScroll={ e => {handleChatScroll(e); setContainerMaxHeight(e.target.scrollHeight) }}
            >
                <div className='Message_container'>
                    {chatHistory.length > 0 && chatHistory.map((message, index) =>
                        message.senderId === user.id ?
                        <div className = "currentUser_message_wrapper">
                            <div className='currentUser_messsage_container'>
                                <div className='currentUser_message' ref = {el => chatContainer.current = el}>
                                    <p style ={{display:"block"}} className ="testzz">{message.message}</p>
                                </div>
                                <Avatar src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBMYLhvdVc5YocrrSJpyYXnb274TDj50OZQ&usqp=CAU"/>
                            </div>
                        </div>
                        :
                        <div className = "otherUser_message_wrapper">
                            <div className='otherUser_messsage_container'>
                                <Avatar src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVY-iEh_KAqonOvgpFX8keZ3qd_l4TwwfoPA&usqp=CAU"/>
                                <div className='otherUser_message' ref = {el => chatContainer.current = el}>
                                    {message.message}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                </div>
                <div>
                    <div style = {{display:"flex", justifyContent:"flex-end", alignItems:"center", gap:"10px", padding:"5px"}}>
                        <div style ={{display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(128, 128, 128, 0.30)", borderRadius:"20px", maxWidth:"90%",padding:"5px",flexGrow:1}}>
                            <TextareaAutosize
                            className='input_messages' 
                            placeholder='Reply'
                            //minRows = {1}
                            maxRows = {5}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown = {e => handleReplyEnter(e)}
                            ref = {textAreaRef}
                            />
                            <TextAreaEmojis
                            input = {textAreaRef.current}
                            anchor = {individualChatAnchor}
                            setAnchor = {setIndividualChatAnchor}
                            title = {false}
                            setMessage = {setMessage}
                            />
                        </div>
                    <div>
                    <motion.div
                    whileHover={{
                        transition:{repeat: Infinity, duration: 1},
                        opacity:[.5,0]
                    }}
                    >
                        <SendIcon sx ={{fontSize:"25px", cursor:"pointer"}} onClick = { e => handleReplySubmit(e)}/>
                    </motion.div>
                    </div>
                    </div>
                </div>
                </>   
            }
        </Popover>
    </>
  )
}
