
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { accountContext } from "../../Contexts/appContext"
import "./profile.css"
import { Avatar } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export const Profile = ()=> {
    const { user } = useContext(accountContext) 
    const { userId } = useParams()
    const navigateTo = useNavigate()

    const[viewedUser, setViewedUser] = useState(null)

    useEffect(()=>{
        const URL = `http://localhost:3001/user/information/${userId}`
        axios.get(URL,{
            headers:{
                "authorization": localStorage.getItem("Token")
            }
        })
        .then(res => setViewedUser(res.data))
        .catch(err => console.log(err))
    },[])

    /*
                {
              viewedUser._id !== user.id ? 
                <div>{viewedUser.username}'s Dashboard</div>
                : 
                <div>Hello {viewedUser.username} this is your dashboard.</div>
            }
     */
    return(
        <>
        {viewedUser &&
            <div className="profile_background">
                <div className="profile_backdrop">
                </div>
                <div className="profile_information">
                    <div className="profile_introduction_wrapper">
                        <div className="profile_introduction_section">
                            <Avatar className = "profile_image" src = "https://images.rawpixel.com/image_800/       czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvMjc5LXBhaTE1NzktbmFtLmpwZw.jpg?     s=qlwh08_eo5rW6zVvtT9_4Z5EIxRr02UnD8ujt_zKxWM" sx = {{width:"250px", height:"250px"}}/>
                            <div style = {{height:'40%'}}>
                                <h1 style = {{fontSize:"3.5rem", fontWeight:"700"}}>Henry Li</h1>
                                <h5 style = {{fontSize:"1.5rem", fontWeight:"500"}}>@Stevenson</h5>
                                <Button variant="contained" sx = {{margin:"20px 0"}} endIcon={<SendIcon />}>
                                Send Message
                                </Button>
                            </div>
                        </div>
                        <div style = {{width:"40%"}}>
                        <h1>A little about me...</h1>
                        <p style = {{ fontWeight:"600", fontSize:"1.2rem"}}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, laborum dolores culpa debitis nam blanditiis quas laboriosam! Nam, quisquam cumque dolor expedita quas praesentium harum saepe suscipit amet modi dicta asperiores laboriosam vitae magnam similique aliquam cupiditate sint ducimus voluptatem dolores nisi neque error adipisci rem! Sapiente veritatis adipisci amet, quisquam dolorum et doloremque culpa accusantium minus exercitationem sit eligendi, magni
                        </p>
                        </div>
                    </div>
                    <div className="social_media_bar">
                            <LinkedInIcon sx = {{fontSize:"30px", color:"#0072b1"}}/>
                            <InstagramIcon sx = {{fontSize:"30px", color:"#bc2a8d"}} className ="instagram"/>
                            <FacebookIcon sx = {{fontSize:"30px", color:"#4267B2"}}/>
                            <TwitterIcon sx = {{fontSize:"30px", color:"#00acee"}}/>
                    </div>
                </div>
            </div>
        }
        </>
    ) 
}

