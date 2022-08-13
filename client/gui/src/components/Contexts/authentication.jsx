import {createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { authCheck } from "../../UserAuth/checkAuth";

export const accountContext = createContext()

export const Authentication = ({children}) =>{

    //const navigateTo = useNavigate()

    const [userStatus, setUserStatus] = useState(localStorage.getItem("userStatus"))

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")))



    return(
        <accountContext.Provider value = {{userStatus, setUserStatus, user, setUser}}>
            {children}
        </accountContext.Provider>    
        )
    }
