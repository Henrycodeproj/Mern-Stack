import "../Posts/posts.css"
import {useState, useContext} from "react"
import { accountContext } from "../Contexts/authentication"
import axios from "axios"
import { Suspense } from "react"

export const Posts = ()=>{
    const [status, setStatus] = useState('')

    const {user} = useContext(accountContext)

    const statusHandler = (e)=> {
        e.preventDefault()
        axios.post("http://localhost:3001/posts",{
            user:user.id,
            post:status,
        }).then(res=>{
            console.log(res.data)
            setStatus('')
        }).catch(err=>console.log(err))
    }
    
    //if (!user) return null

    return (
        <Suspense fallback = {<div>loading...</div>}>
        <div>
            <form className="post_form" onSubmit={(e) =>statusHandler(e)}>
                <input className="buss" placeholder={`Hi ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, what are you doing on campus today?`} onChange={(e)=>setStatus(e.target.value)} value ={status}></input>
            </form>
            {status}
        </div>
        </Suspense>
    )
}
