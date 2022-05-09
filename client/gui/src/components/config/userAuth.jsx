import {useState} from "react";
import { Outlet } from "react-router-dom";

export const UserAuthentication = () =>{
    const [loggedIn, setLoggedIn] = useState(true)
    return (
        loggedIn? <Outlet></Outlet> : <div>noooo</div>
    )
}