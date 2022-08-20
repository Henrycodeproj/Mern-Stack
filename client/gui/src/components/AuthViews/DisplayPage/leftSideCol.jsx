import { Avatar } from "@mui/material"
import { accountContext } from "../../Contexts/appContext"
import { useContext } from "react"

export const LeftColumn = ()=>{
    const {user} = useContext(accountContext)

    return(
        <div className='side_header'>
            <div className="leftSide_card">
                <Avatar src ="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png">
                </Avatar>
            </div>
            {user.username}
        </div>
    )
}

