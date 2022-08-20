import axios from 'axios';
import '../DisplayPage/display.css'
import { useState, useEffect, useRef, useContext} from 'react';
import { Posts } from '../../Posts/Posts';
import { accountContext } from '../../Contexts/appContext';
import { LeftColumn } from './leftSideCol';

export const Display = () =>{

    const {posts, setPosts} = useContext(accountContext)
    const ref = useRef()

    let lastPostIndex = 15

    const handleScroll = (e) => {

        if (e.target.clientHeight + e.target.scrollTop + 1 >= e.target.scrollHeight) {

            const URL = `http://localhost:3001/posts/${lastPostIndex + 5}`
            axios.get(URL, {
                headers:{
                    "authorization":localStorage.getItem("Token")
                }
            })
            .then(res =>{
                const fetchedPosts = []
                res.data.forEach((post) => fetchedPosts.push(post))
                if (fetchedPosts.length > posts) {
                    setPosts(fetchedPosts)
                    lastPostIndex += 5
                }
            })
        }
    }

    useEffect(()=>{
        const element = ref.current

        element.addEventListener("scroll", handleScroll)
        
        return () => element.removeEventListener("scroll", handleScroll);
    },[])

    useEffect (()=>{
        const URL = `http://localhost:3001/posts/${lastPostIndex}`
        axios.get(URL, {
            headers:{
                "authorization":localStorage.getItem("Token")
            }
        })
        .then(res => setPosts(res.data))
        .catch(err => console.log(err))
    },[])

    return (
        <div className='display_container' >
            <div className='display_newsfeed_wrapper'>
                <div className='left_sidebar'>
                    <LeftColumn/>
                    <ul>
                        <div className='tester'>
                        <li>a</li>
                        <li>a</li>
                        <li>a</li>
                        <li>a</li>
                        <li>a</li>
                        <li>a</li>
                        <li>a</li>
                        </div>
                    </ul>
                </div>

                <div className='newsfeed_container' ref = {ref}>
                    <div className='outer_posts_container'>
                        <Posts/>
                    </div>
                    <div>
                        <ul>
                            {
                            posts.length > 0 ? posts.map((post)=>
                                <li key = {post._id} className = "posts_articles">
                                    <img src ="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" className='faker'></img>
                                    <div>{post.posterId.username}{post.posterId.email}</div>
                                    {post.Description}
                                </li>
                            ):
                            <h2>There are no current listed events on campus.</h2>
                            }
                        </ul>
                    </div>
                </div>

                <div className='right_sidebar'>
                    <div className='side_header'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque voluptas et doloribus ipsa officia deserunt cum est odit consequuntur asperiores.
                    </div>
                </div>
            </div>
        </div>
    )
}
