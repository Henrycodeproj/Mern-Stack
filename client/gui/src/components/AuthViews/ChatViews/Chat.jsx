import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import io from "socket.io-client"
import { accountContext } from "../../Contexts/appContext"


export const Chat = () => {
    const socket = io.connect("http://localhost:3001", {autoConnect:false})
    const { user } = useContext(accountContext)
    const { chatId } = useParams()
    const [message, setMessage] = useState('')
    const [convo, setConvo] = useState([])
    const navigateTo = useNavigate()
    
    const sendMessage = (e) => {
        console.log("message")
        e.preventDefault()
        const sendMessageUrl = 'http://localhost:3001/message/send'
        const data = {
            chatId:chatId,
            message:message,
            senderId:user.id
        }

        setMessage("")

        axios.post(sendMessageUrl, data, {
            headers:{
                "authorization": localStorage.getItem("Token")
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

        socket.emit("sendUserId", {chatId:chatId, message:message})
    }

    useEffect(()=>{
        const getPreviousMessageUrl = `http://localhost:3001/conversation/${chatId}`
        axios.get(getPreviousMessageUrl, {
            headers:{
                "authorization": localStorage.getItem("Token")
            }
        })
        .then(res => {
            setConvo(res.data)
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 404 || 401) navigateTo("/error", {replace:true})
            else console.log(err)
        })
    },[])

    useEffect(()=>{
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