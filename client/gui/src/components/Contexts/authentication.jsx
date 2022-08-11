import {createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { authCheck } from "../../UserAuth/checkAuth";

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
