import axios from 'axios';
import { useState, useEffect} from 'react';
import { Posts } from '../Posts/Posts';
import '../AuthViews/display.css'

export const Display = () =>{

    const [posts, setPosts] = useState([])

    useEffect (()=>{
        const URL = 'http://localhost:3001/posts'
        axios.get(`${URL}`, {
            headers:{
                "authorization":localStorage.getItem("Token")
            }
        })
        .then(res => setPosts(res.data.reverse()))
        .catch(err => console.log(err))
    },[])

    console.log(posts)
    
    return (
        <div className='display_wrapper'>
            <div className='newsfeed_container'>
                <Posts posts ={posts} setPosts={setPosts}/>
                <div>
                    <ul>
                        {
                        posts.length > 0 ? posts.map((post)=>
                            <li key = {post._id} className = "posts_articles">
                                <img src ="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" className='faker'></img>
                                {post.Description}
                            </li>
                        ):
                        <div>There are no current events on campus</div>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Display