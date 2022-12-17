import {createContext, useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import io from "socket.io-client"
import axios from "axios";

export const accountContext = createContext()

export const AppContext = ({children}) =>{
    const socket = io.connect("http://localhost:3001", { transports: ["websocket", "polling"] })
    
    const navigateTo = useNavigate()

    const logoutHandler = () => {
        setUserNotification([])
        socket.disconnect()
        localStorage.removeItem("userStatus")
        localStorage.removeItem("Token")
        localStorage.removeItem("User")
        navigateTo("/")
    }
    const [lastActive, setLastActive] = useState()
    const [userStatus, setUserStatus] = useState(localStorage.getItem("userStatus"))

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")))

    const [posts, setPosts] = useState(null)
    
    const [activeUsers, setActiveUsers] = useState({})

    const [recentMessages, setRecentMessages] = useState([])

    const [dark, setDark] = useState(false)

    const [isNewChat, setIsNewChat] = useState([])
    
    const [userNotification, setUserNotification] = useState([])

    const [lastPostIndex, setLastPostIndex] = useState(15);

    const [activeNotification, setActiveNotification] = useState(true);

    const [numb, setNumb] = useState(0);

    const [time, setTime] = useState()

    const [unreadNotifications, setUnreadNotifications] = useState(0)

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
            socket,
            recentMessages,
            setRecentMessages,
            isNewChat,
            setIsNewChat,
            userNotification,
            setUserNotification,
            lastPostIndex,
            setLastPostIndex,
            activeNotification, 
            setActiveNotification,
            numb, 
            setNumb,
            time,
            setTime,
            lastActive, 
            setLastActive,
            unreadNotifications,
            setUnreadNotifications,
        }}>
            {children}
        </accountContext.Provider>    
        )
    }
