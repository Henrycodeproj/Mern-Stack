import "../Posts/posts.css"
import {useState, useContext} from "react"
import { accountContext } from "../Contexts/authentication"
import axios from "axios"

export const Posts = ({posts, setPosts})=>{

    const [status, setStatus] = useState('')

    const {user} = useContext(accountContext)

    const statusHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/posts",{
            user:user.id,
            post:status,
        }).then(res=>{
            setPosts(res.data.data)
            setStatus('')
        })
        .catch(err=>console.log(err))
    }

    console.log(posts,'1231231')

    if (user === null) return <div>loading...</div>

    return (
        <div className="add_post_container">
            <img src = "https://booleanstrings.com/wp-content/uploads/2021/10/profile-picture-circle-hd.png" className ="input_picture">
            </img>
            <div className = "ass">
                <form className="post_form" onSubmit={(e) =>statusHandler(e)}>
                    <input 
                    className= "buss" 
                    placeholder={`Hi ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, what are you doing on campus today?`} onChange={(e)=>setStatus(e.target.value)}
                    value = {status}
                    type = "text"
                    >
                    </input>
                </form>
            </div>
        </div>
    )
}
