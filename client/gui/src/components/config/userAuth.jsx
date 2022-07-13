import {useContext, useState} from "react";
import { Outlet } from "react-router-dom";
import { accountContext } from "../Contexts/authentication";
import { useAuth } from "../Contexts/authentication";
import { useNavigate } from "react-router-dom";

export const UserAuthentication = () =>{
    const navigateTo = useNavigate()

    const {loggedUser, setLoggedUser} = useContext(accountContext)

    return (
        loggedUser ? <Outlet></Outlet> : <div>You are not authorized</div>
    )
}
