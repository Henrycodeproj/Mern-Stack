import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountContext } from './Contexts/authentication';

export const Display = ({test}) =>{

    const navigateTo = useNavigate()

    const [users, setUsers] = useState([])
    console.log(test)

    // useEffect (()=>{
    //     const URL = 'http://localhost:3001/users'
    //     axios.get(`${URL}`, {
    //         headers:{
    //             "authorization":localStorage.getItem("Token")
    //         }
    //     })
    //     .then((res)=> {
    //         setUsers(res.data)
    //     }).catch(err => {
    //         navigateTo("/")
    //     })
    // })
    const {userStatus, setUserStatus} = useContext(accountContext)
    
    return (
        <div className='du'>
            {users.length !== 0 ? users.map((user)=> user.username): <div>No current posts</div>}
        </div>
    )
}