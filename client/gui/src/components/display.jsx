import axios from 'axios';
import { useState, useEffect } from 'react';

export const Display = () =>{

    const [users, setUsers] = useState([])

    useEffect (()=>{
        const URL = 'http://localhost:3001/users'
        axios.get(`${URL}`, {
            headers:{
                "authorization":localStorage.getItem("Token")
            }
        })
        .then(res => setUsers(res.data))
    },[])
    
    return (
        <div className='du'>
            {users.length !== 0 ? users.map((user)=> user.username): <div>not auth</div>}
        </div>
    )
}