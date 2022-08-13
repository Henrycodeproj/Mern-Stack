import "../Posts/posts.css"
import {useState, useContext} from "react"
import { accountContext } from "../Contexts/authentication"

export const Posts = ()=>{
    const [status, setStatus] = useState('')

    const {user} = useContext(accountContext)

    const statusHandler = (e)=> {
        setStatus(e.target.value)
    }
    const greetMessage = `Hi ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, what are you doing on campus today?`
    
    return (
        <div>
            <form className="post_form">
                <input className="buss" placeholder={greetMessage} onChange={statusHandler}></input>
            </form>
            {status}
        </div>
    )
}