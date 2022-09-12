import {createContext, useState} from "react";
import { useNavigate } from "react-router-dom";

export const accountContext = createContext()

export const AppContext = ({children}) =>{

    const navigateTo = useNavigate()

    const logoutHandler = () => {
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
            logoutHandler
        }}>
            {children}
        </accountContext.Provider>    
        )
    }
