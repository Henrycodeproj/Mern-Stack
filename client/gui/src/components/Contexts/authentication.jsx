import { createContext, useState } from "react";

export const accountContext = createContext()

export const Authentication = ({children}) =>{

    const[loggedUser, setLoggedUser] = useState(false)

    return (
        <accountContext.Provider value = {{loggedUser,setLoggedUser}}>
            {children}
        </accountContext.Provider>    
    )
}