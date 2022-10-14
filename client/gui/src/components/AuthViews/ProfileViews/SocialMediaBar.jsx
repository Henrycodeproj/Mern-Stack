import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Tooltip from '@mui/material/Tooltip';
import "./SocialMediaBar.css";
import { motion } from "framer-motion"
import axios from 'axios';


export const SocialMediaBar = ({viewedUser, setViewedUser, deleteMedia}) => {
  console.log(viewedUser)
  const removeSocialHandler = (media) => {
    axios.patch()
  }
  return (
    <div className="social_media_bar" style = {{position: deleteMedia ? "relative": null, right: deleteMedia ? "15px" : null, gap: deleteMedia ? null : "15px"}}>
    {
      viewedUser.socialMedia?.linkedin &&
      <motion.div whileHover={{ scale: 1.1 }}>
        { 
          deleteMedia &&
          <Tooltip title = "Remove Linkedin Link" placement="top">
            <RemoveCircleIcon sx = {{fontSize:"15px", position:"relative", color:"rgb(199, 199, 199)", bottom:"24px", left:"38px", cursor:"pointer"}}/>
          </Tooltip>
        }
        <a href = {viewedUser.socialMedia.linkedin} target = "blank">
          <Tooltip title = "LinkedIn">
            <LinkedInIcon sx = {{fontSize:"35px", color:"#0072b1", cursor:"pointer"}}/>
          </Tooltip>
        </a>
      </motion.div>
    }
    {
      viewedUser.socialMedia?.instagram &&
      <motion.div whileHover={{ scale: 1.1 }}>
        { 
          deleteMedia &&
        <Tooltip title = "Remove Instagram Link" placement="top">
          <RemoveCircleIcon sx = {{fontSize:"15px", position:"relative", color:"rgb(199, 199, 199)",  bottom:"24px", left:"38px", cursor:"pointer"}}/>
        </Tooltip>
        }
        <a href = {viewedUser.socialMedia.instagram} target = "blank">
          <Tooltip title = "Instagram">
            <InstagramIcon sx = {{fontSize:"35px", color:"#bc2a8d", cursor:"pointer"}}/>
          </Tooltip>
        </a>
      </motion.div>
    }
    {
      viewedUser.socialMedia?.facebook &&
      <motion.div whileHover={{ scale: 1.1 }}>
        {
          deleteMedia &&
        <Tooltip title = "Remove Facebook Link" placement="top">
          <RemoveCircleIcon sx = {{fontSize:"15px", position:"relative", color:"rgb(199, 199, 199)",  bottom:"24px", left:"38px", cursor:"pointer"}}/>
        </Tooltip>
        }
        <a href = {viewedUser.socialMedia.facebook} target = "blank">
          <Tooltip title = "Facebook">
            <FacebookIcon sx = {{fontSize:"35px", color:"#4267B2", cursor:"pointer"}}/>
          </Tooltip>
        </a>
      </motion.div>
    }
    {
      viewedUser.socialMedia?.twitter &&
      <motion.div whileHover={{ scale: 1.1 }}>
        { 
          deleteMedia &&
        <Tooltip title = "Remove Twitter Link" placement="top">
          <RemoveCircleIcon sx = {{fontSize:"15px", position:"relative", color:"rgb(199, 199, 199)",  bottom:"24px", left:"38px", cursor:"pointer"}}/>
        </Tooltip>
        }
        <a href = {viewedUser.socialMedia.twitter} target = "blank">
          <Tooltip title = "Twitter">
            <TwitterIcon sx = {{fontSize:"35px", color:"#00acee", cursor:"pointer"}}/>
          </Tooltip>
        </a>
      </motion.div>
    }
    {
      viewedUser.socialMedia?.github &&
      <motion.div whileHover={{ scale: 1.1 }}>
        {
          deleteMedia &&
          <Tooltip title = "Remove Github Link" placement="top">
            <RemoveCircleIcon sx = {{fontSize:"15px", position:"relative", color:"rgb(199, 199, 199)", bottom:"24px", left:"38px", cursor:"pointer"}} onClick = {removeSocialHandler('github')}/>
          </Tooltip>
        }
      <a href = {viewedUser.socialMedia.github} target = "blank">
        <Tooltip title = "Github">
          <GitHubIcon sx = {{fontSize:"35px", color:"#171515", cursor:"pointer"}}/>
        </Tooltip>
      </a>
      </motion.div>
    }
</div>
  )
}
