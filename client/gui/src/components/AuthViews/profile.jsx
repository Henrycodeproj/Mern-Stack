import {useContext} from "react"
import { accountContext } from "../Contexts/authentication"

export const Profile = ()=> {
    const {user} = useContext(accountContext)

    return(
        <div>Hello {user.username} {user.id} this is your profile</div>
    ) 
}