
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { authCheck } from "../../UserAuth/checkAuth";
import { useState, useEffect } from "react";


export const UserAuthentication = () =>{

    //const navigateTo = useNavigate()
    const isAuth = Promise.resolve(authCheck())
    console.log(isAuth)
    return (
        isAuth ? <Outlet/> : <Navigate to="/" replace={true} />
    )
}
