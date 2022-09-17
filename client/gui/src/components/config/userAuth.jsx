
import { Outlet } from "react-router-dom";
import { Navigate} from "react-router-dom";
import { useState, useEffect, useContext} from "react";
import { accountContext } from "../Contexts/appContext";
import { authCheck } from "../../UserAuth/checkAuth";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export const UserAuthentication = () =>{

    const {userStatus, setUserStatus} = useContext(accountContext)

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
       authCheck().then(res=>{
            setUserStatus(res.data)
            setLoading(false)
        })
    },[])
    
    if (loading) return (    
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loading}
    >
        <CircularProgress color="inherit" />
    </Backdrop>)

    return (
        userStatus ? <Outlet/> : <Navigate to="/" replace={true} />
    )
}
