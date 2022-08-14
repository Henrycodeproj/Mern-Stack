import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountContext } from '../Contexts/authentication';
import { Posts } from '../Posts/Posts';
import '../AuthViews/display.css'

import {lazy, Suspense} from 'react';

async function getPosts(){
    const URL = 'http://localhost:3001/users'
    const response = await axios.get(`${URL}`, {
        headers:{
            "authorization":localStorage.getItem("Token")
        }
    })
    return response
}

export const Display = () =>{
    const response = getPosts()

    const navigateTo = useNavigate()

    const [posts, setPosts] = useState([])

    useEffect (()=>{
        response.then(res=> setPosts(res.data))
    }, [])

    //const {userStatus, setUserStatus, user} = useContext(accountContext)

    if (!posts) return <div>loading...</div>
    
    return (
        <div className='display_wrapper'>
            <div className='newsfeed_container'>
                <Posts/>
                <div>
                {posts.length !== 0 ? posts.map((post)=> post.username): <div>No current posts</div>}
                </div>
            </div>
        </div>
    )
}

export default Display