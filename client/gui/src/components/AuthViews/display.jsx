import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountContext } from '../Contexts/authentication';
import { Posts } from '../Posts/Posts';
import '../AuthViews/display.css'

import {lazy, Suspense, read} from 'react';

export const Display = () =>{

    const navigateTo = useNavigate()

    const [posts, setPosts] = useState([])

    useEffect (()=>{
        const URL = 'http://localhost:3001/posts'
        axios.get(`${URL}`, {
            headers:{
                "authorization":localStorage.getItem("Token")
            }
        })
        .then(res => setPosts(res.data))
        .catch(err => console.log(err))
    },[])

    const {userStatus, setUserStatus, user} = useContext(accountContext)
    console.log(posts)

    //if (posts.length === 0) return <div>loading...</div>
    
    return (
        <div className='display_wrapper'>
            <div className='newsfeed_container'>
                <Posts posts ={posts} setPosts={setPosts}/>
                <div>
                {posts && posts.map((post)=> 
                <div>
                    {post.Description}
                </div>)
                }
                </div>
            </div>
        </div>
    )
}

export default Display