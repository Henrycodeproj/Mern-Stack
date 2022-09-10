import axios from "axios"
import {useState, useEffect} from "react"
import "./RightSideCol.css"
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

export const RightSideCol = () => {
    const [popularPosts, setPopularPosts] = useState([])

    useEffect(()=>{
        const url = "http://localhost:3001/posts/popular"
        axios.get(url, {
            headers:{
                "authorization":localStorage.getItem("Token")
            }
        })
        .then(res => {
            console.log(res.data)
            setPopularPosts(res.data)
        })
        .catch(err => console.log(err))
    },[])

  return (
    <div className = "right_column_wrapper">
        <div className = "popular_container">
            <h2>Most Popular Today</h2>
            {popularPosts.map((post)=> 
                <div>
                    <div style = {{margin:"10px 0px"}}>
                        {post.Description}
                    </div>
                    <Divider/>
                </div>
            )}
        </div>
        <div className="recent_message_container">
            <h2 style= {{marginBottom:"10px"}}>Recent Messages</h2>
            <div className = "recent_message_avatars">
                <div>
                    <Avatar src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&            ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlJTIwcG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"/>
                    <div className="recent_message_online"></div>
                </div>
                <h3 className="recent_message_names">Jacky</h3>
            </div>
            <div className = "recent_message_avatars">
                <div>
                    <Avatar src = "https://i.pinimg.com/750x/26/12/73/261273da88b3732c008a871d0284642b.jpg"></Avatar>
                    <div className="recent_message_online"></div>
                </div>
                <h3 className="recent_message_names">Vicky</h3>
            </div>
            <div className="recent_message_avatars">
                <div>
                    <Avatar src ="https://www.lensrentals.com/blog/media/2020/03/Zach-Sutton-Beauty-Photograph-1.jpg"/>
                    <div className="recent_message_online"></div>
                </div>
                <h3 className="recent_message_names">Emily</h3>
            </div>
            <div className="recent_message_avatars">
                <div>
                    <Avatar src ="https://expertphotography.b-cdn.net/wp-content/uploads/2020/05/photo-of-woman-wearing-yellow.jpg"/>
                    <div className="recent_message_online"></div>
                </div>
                <h3 className="recent_message_names">Fiona</h3>
            </div>
        </div>
    </div>
  )
}
