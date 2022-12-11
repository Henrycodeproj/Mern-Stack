import axios from 'axios'
import {useEffect, useContext} from 'react'
import { accountContext } from '../../Contexts/appContext'
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

export const Notification = () => {
    const {user, userNotification, setUserNotification} = useContext(accountContext)
    useEffect(() => {
        const getNotifications = async () => {
            const url = `http://localhost:3001/user/${user.id}/notifications`
            const response = await axios.get(url, {
                headers: {
                    authorization: localStorage.getItem("Token"),
                }
            })
            console.log(response)
            if (response.data.length > 0) setUserNotification(prev => [...prev, response.data[0]])
        }
        getNotifications()
    },[])
    return(
        <>
        {console.log(userNotification)}
        {userNotification.length > 0 ? userNotification.map(entry => 
        <MenuItem>
            {entry._id}
            <Avatar src = {`https://ucarecdn.com/${entry.attendId.profilePicture}/`}/>
        </MenuItem>
        )
        :null
        }
        </>
    )
}
