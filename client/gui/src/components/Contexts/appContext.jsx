import {createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { authCheck } from "../../UserAuth/checkAuth";

export const accountContext = createContext()

export const AppContext = ({children}) =>{


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
            setActiveUsers
        }}>
            {children}
        </accountContext.Provider>    
        )
    }
