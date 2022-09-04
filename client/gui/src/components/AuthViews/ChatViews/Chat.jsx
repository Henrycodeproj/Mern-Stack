import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import io from "socket.io-client"
import { accountContext } from "../../Contexts/appContext"


export const Chat = () => {
    const socket = io.connect("http://localhost:3001")
    const { user } = useContext(accountContext)
    const { chatId } = useParams()
    const [message, setMessage] = useState('')
    const [convo, setConvo] = useState([])
    
    const sendMessage = (e) => {
        e.preventDefault()
        const sendMessageUrl = 'http://localhost:3001/message/send'
        const data = {
            chatId:chatId,
            message:message,
            senderId:user.id
        }

        axios.post(sendMessageUrl, data, {
            headers:{
                "authorization": localStorage.getItem("Token")
            }
        })
        .then(res => console.log(res,'111'))
        .catch(err => console.log(err))

        socket.emit("sendChatId", {chatId:chatId, message:message})
    }

    useEffect(()=>{
        const previousMessageUrl = `http://localhost:3001/conversation/${chatId}`
        axios.get(previousMessageUrl, {
            headers:{
                "authorization": localStorage.getItem("Token")
            }
        })
        .then(res => setConvo(res.data))
        
        socket.on(`${chatId}`, (data) => {
            setConvo(newMessage => [...newMessage, data])
        })
    },[])


    return (
        <div>
            <form onSubmit={sendMessage}>
                <input 
                style = {{ background:"white" }}
                onChange = { (e) => setMessage(e.target.value) }
                value = {message}
                />
                <button type ="submit">submit</button>
            </form>
            <ul>
            {convo.map((message)=>
            <li style={{color:"white", fontSize:24}}>{message.message}</li>
            )}
            </ul>
        </div>
    )
} 