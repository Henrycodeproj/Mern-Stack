import {useContext, useState} from "react";
import { Outlet } from "react-router-dom";
import { accountContext } from "../Contexts/authentication";
import { useAuth } from "../Contexts/authentication";

export const UserAuthentication = () =>{

    const {loggedUser, setLoggedUser} = useContext(accountContext)

    return (
        loggedUser ? <Outlet></Outlet> : <div>not logged in</div>
    )
}
