import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountContext } from '../Contexts/authentication';
import { Posts } from '../Posts/Posts';
import '../AuthViews/display.css'

export const Display = () =>{

    const navigateTo = useNavigate()

    const [posts, setPosts] = useState([])

    // useEffect (()=>{
    //     const URL = 'http://localhost:3001/users'
    //     axios.get(`${URL}`, {
    //         headers:{
    //             "authorization":localStorage.getItem("Token")
    //         }
    //     })
    //     .then((res)=> {
    //         setPosts(res.data)
    //     }).catch(err => {
    //         navigateTo("/")
    //     })
    // })

    const {userStatus, setUserStatus} = useContext(accountContext)
    
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