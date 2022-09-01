import { useState, useEffect } from "react"
import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")

export const Message = () => {

    const [message, setMessage] = useState('')
    const [convo, setConvo] = useState(null)
    
    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit("message", {message:message})
    }

    useEffect(()=>{
        socket.on("62cd136c416bc62d3bf30a29", (data) => {
            console.log(data)
            setConvo(data)
        })
    },[socket])

    return (
        <div>
            <form onSubmit={sendMessage}>
                <input style = {{ background:"white" }} onChange = { (e) => setMessage(e.target.value) }value = {message}></  input>
                <button type ="submit">submit</button>
            </form>
        {convo && convo.map((c)=><div>{c.message}</div>)}
        </div>
    )
} 