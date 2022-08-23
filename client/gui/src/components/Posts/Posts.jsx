import "../Posts/posts.css"
import {useState, useContext} from "react"
import { accountContext } from "../Contexts/appContext"
import axios from "axios"
import TextareaAutosize from '@mui/material/TextareaAutosize';


export const Posts = ()=>{

    const [status, setStatus] = useState('')

    const {user, posts, setPosts} = useContext(accountContext)


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

    if (user === null) return <div>loading...</div>

    return (
        <div className="add_post_container">
            <img src = "https://booleanstrings.com/wp-content/uploads/2021/10/profile-picture-circle-hd.png" className ="input_picture">
            </img>
            <div className = "post_form_container">
                <form className="post_form" onSubmit={(e) =>statusHandler(e)}>
                    <TextareaAutosize
                    placeholder={`Hi ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, what are you doing on campus today?`}
                    onChange = { (e) => setStatus(e.target.value)}
                    value = {status}
                    style ={{width:'100%'}}
                    />
                </form>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ad officiis aperiam maxime ducimus porro, autem vel beatae voluptas adipisci.
                </div>
            </div>
        </div>
    )
}
