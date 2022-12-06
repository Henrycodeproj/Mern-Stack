import axios from 'axios'
import {useEffect, useContext} from 'react'
import { accountContext } from '../../Contexts/appContext'

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
            console.log(response, 'notification response')
            setUserNotification(response)
        }
        getNotifications()
    },[])
  return (
    <div>Notification</div>
  )
}

