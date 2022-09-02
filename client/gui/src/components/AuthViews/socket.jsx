import { useState, useEffect } from "react"
import io from "socket.io-client"


export const Message = () => {
    const socket = io.connect("http://localhost:3001")
    const [message, setMessage] = useState('')
    const [convo, setConvo] = useState([])
    
    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit("message", {message:message})
        console.log(133)
        //setConvo(userMessage => [...userMessage, {message:message}])
    }

    useEffect(()=>{
        socket.on("62cd136c416bc62d3bf30a29", (data) => {
            console.log('1?')
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
            {console.log(convo,'12312313131')}
            {convo.map((message)=>
            <li style={{color:"white", fontSize:24}}>{message.message}</li>
            )}
            </ul>
        </div>
    )
} 