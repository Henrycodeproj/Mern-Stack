import {useContext, useState, useEffect} from "react";
import { Outlet } from "react-router-dom";
import { accountContext } from "../Contexts/authentication";
import { Navigate } from "react-router-dom";
import { authCheck } from "../../UserAuth/checkAuth";


export const UserAuthentication = () =>{

    //const navigateTo = useNavigate()
    const isAuth = authCheck()

    console.log(isAuth)

    return (
        isAuth ? <Outlet/> : <Navigate to="/" replace={true} />
    )
}
