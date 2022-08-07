import {createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const accountContext = createContext()

export const Authentication = ({children}) =>{

    //const navigateTo = useNavigate()

    const [userStatus, setUserStatus] = useState(false)

    return(
        <accountContext.Provider value = {{userStatus, setUserStatus}}>
            {children}
        </accountContext.Provider>    
        )
    }
