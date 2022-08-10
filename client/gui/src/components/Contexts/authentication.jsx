import {createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { authCheck } from "../../UserAuth/checkAuth";

export const accountContext = createContext()

export const Authentication = ({children}) =>{

    //const navigateTo = useNavigate()

    const [userStatus, setUserStatus] = useState(authCheck().then(res=>res.data))


    return(
        <accountContext.Provider value = {{userStatus, setUserStatus}}>
            {children}
        </accountContext.Provider>    
        )
    }
