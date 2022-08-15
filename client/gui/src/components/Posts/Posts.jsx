import "../Posts/posts.css"
import {useState, useContext, useEffect} from "react"
import { accountContext } from "../Contexts/authentication"
import axios from "axios"
import { Suspense } from "react"

export const Posts = ({posts, setposts})=>{

    const [status, setStatus] = useState('')

    const {user, setUser} = useContext(accountContext)

    const statusHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/posts",{
            user:user.id,
            post:status,
        }).then(res=>{
            setStatus('')
        })
        .catch(err=>console.log(err))
    }

    console.log(posts,'1231231')

    if (user === null) return <div>loading...</div>

    return (
        <div>
            <form className="post_form" onSubmit={(e) =>statusHandler(e)}>
                <input className="buss" placeholder={`Hi ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, what are you doing on campus today?`} onChange={(e)=>setStatus(e.target.value)} value ={status}></input>
            </form>
            {status}
        </div>
    )
}
