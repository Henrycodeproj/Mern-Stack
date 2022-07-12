import { useContext } from "react";
import {createContext, useState} from "react";
import { UserAuthentication } from "../config/userAuth";

export const accountContext = createContext()

export const Authentication = ({children}) =>{

    const [loggedUser, setLoggedUser] = useState(true)

    return(
        <accountContext.Provider value = {{loggedUser, setLoggedUser}}>
            {children}
        </accountContext.Provider>    
    )
}
