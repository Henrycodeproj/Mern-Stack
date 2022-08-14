
import { Outlet } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, Suspense} from "react";
import { accountContext } from "../Contexts/authentication";
import { authCheck } from "../../UserAuth/checkAuth";


const UserAuthentication = () =>{

    const {userStatus, setUserStatus} = useContext(accountContext)

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
       authCheck().then(res=>{
            setUserStatus(res.data)
            //setLoading(false)
        })
    },[])
    
    //if (loading) return <> Loading... </>

    return (
        <Suspense>
        {userStatus ? <Outlet/> : <Navigate to="/" replace={false} />}
        </Suspense>
    )
}

export default UserAuthentication