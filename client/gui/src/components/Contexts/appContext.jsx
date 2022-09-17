import {createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client"
export const accountContext = createContext()

export const AppContext = ({children}) =>{

    const socket = io.connect("http://localhost:3001")

    useEffect(()=>{
        socket.on("activeUsers", (usersStatus) => {
            console.log(usersStatus,'111111232131231')
            setActiveUsers(usersStatus)
        })
    },[])

    const navigateTo = useNavigate()

    const logoutHandler = () => {
        socket.disconnect()
        localStorage.removeItem("userStatus")
        localStorage.removeItem("Token")
        localStorage.removeItem("User")
        navigateTo("/")
    }

    const [userStatus, setUserStatus] = useState(localStorage.getItem("userStatus"))

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")))

    const [posts, setPosts] = useState([])
    
    const [activeUsers, setActiveUsers] = useState([])


    return(
        <accountContext.Provider 
        value = {{
            userStatus,
            setUserStatus,
             user,
            setUser,
            posts,
            setPosts,
            activeUsers,
            setActiveUsers,
            logoutHandler,
            socket
        }}>
            {children}
        </accountContext.Provider>    
        )
    }
