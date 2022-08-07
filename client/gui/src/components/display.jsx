import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Display = () =>{

    const navigateTo = useNavigate()

    const [users, setUsers] = useState([])

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
    
    return (
        <div className='du'>
            {users.length !== 0 ? users.map((user)=> user.username): <div>No current posts</div>}
        </div>
    )
}