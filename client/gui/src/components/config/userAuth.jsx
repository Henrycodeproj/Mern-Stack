
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { authCheck } from "../../UserAuth/checkAuth";
import { useState, useEffect} from "react";
import { Divider } from "@mui/material";


export const UserAuthentication = async () =>{
    const [isAuth, setIsAuth] = useState(null)
    //const navigateTo = useNavigate()

    useEffect(()=>{
        authCheck().then(res => setIsAuth(res.data))
    })

    if (!isAuth) return <div>loading</div>

    return (
        isAuth ? <Outlet/> : <Navigate to="/" replace={true} />
    )
}
