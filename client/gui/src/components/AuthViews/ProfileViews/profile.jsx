
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { accountContext } from "../../Contexts/appContext"

export const Profile = ()=> {
    const { user } = useContext(accountContext) 
    const { userId } = useParams()
    const navigateTo = useNavigate()

    const[viewedUser, setViewedUser] = useState(null)

    useEffect(()=>{
        const URL = `http://localhost:3001/user/information/${userId}`
        axios.get(URL,{
            headers:{
                "authorization": localStorage.getItem("Token")
            }
        })
        .then(res => setViewedUser(res.data))
        .catch(err => console.log(err))
    },[])

    const createChat = () =>{
        const URL = `http://localhost:3001/conversation/create`
        const data = {
            user1:user.id,
            user2:viewedUser._id
        }
        axios.post(URL, data, {
            headers:{
                "authorization" : localStorage.getItem("Token")
            }
        })
        .then(res => navigateTo(`/conversation/${res.data[0]._id}`))
        .catch(err => console.log(err))
    }

    return(
        <>
        <button onClick={createChat}>Chat</button>
        {viewedUser &&
            <div>
            {viewedUser._id !== user.id ? <div>{viewedUser.username}'s Dashboard</div>: <div>Hello {viewedUser.username} this is your dashboard.</div>}
            </div>
        }
        </>
    ) 
}