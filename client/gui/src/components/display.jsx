import axios from 'axios';
import { useState, useEffect } from 'react';

export const Display = () =>{

    const [peoples, setPeople] = useState([])

    useEffect(()=>{
    const URL = 'http://localhost:3001/api'
    axios.get(`${URL}`)
    .then(res => setPeople(res.data))
    },[])

    console.log(peoples)

    return (
        <div className='du'>
            {peoples.map((people) => <h1>{people.email}</h1>)}
        </div>
    )
}