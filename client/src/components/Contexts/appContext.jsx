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
        setOption(false)
      }

    const [option, setOption] = useState(true)

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

    const [time, setTime] = useState(localStorage.getItem("User") ? user.lastActive : null)

    const [unreadNotifications, setUnreadNotifications] = useState(0)

    const [notificationID, setNotificationID] = useState(localStorage.getItem("User") ? user.id : 0)

    const [newNotification, setNewNotification] = useState()

    const [clicked, setClicked] = useState(false)

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
            notificationID, 
            setNotificationID,
            dark, 
            setDark,
            time,
            setTime,
            lastActive, 
            setLastActive,
            unreadNotifications,
            setUnreadNotifications,
            newNotification,
            setNewNotification,
            clicked, 
            setClicked,
            option, 
            setOption,
        }}>
            {children}
        </accountContext.Provider>    
        )
    }
