import {useState} from "react";
import { Outlet } from "react-router-dom";

export const UserAuthentication = () =>{
    const [logged,setLogged] = useState(true)
    return (
        logged? <Outlet></Outlet> : <div>noooo</div>
    )
}