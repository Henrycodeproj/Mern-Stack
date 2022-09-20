import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import Tooltip from "@mui/material/Tooltip";
import ChatIcon from '@mui/icons-material/Chat';
import {useState, useContext} from "react"
import { accountContext } from '../../Contexts/appContext';

export const IndividualChats = ({recievingUserInfo, convoId}) => {
    const {user} = useContext(accountContext)

    const [chatAnchor, setChatAnchor] = useState(null);

    const handleClick = async (event) => {
        const Url = `http://localhost:3001/message/conversation/${convoId}`
        const data = {
            user1: recievingUserInfo._id,
            user2: user.id
        }
        const response = await axios.post(Url, {
            headers:{
                "authorization":localStorage.getItem("Token")
            },
        })
        console.log(response, "data")
        setChatAnchor(event.currentTarget);
    };
  
    const handleChatClose = () => {
        setChatAnchor(null);
    };
  
    const open = Boolean(chatAnchor);

    return (
      <>
      <Tooltip title ="Chat">
        <ChatIcon onClick = {handleClick} sx = {{color:"gray", cursor:"pointer"}}/>
      </Tooltip>
      <Popover
      open={open}
      anchorEl={chatAnchor}
      onClose={handleChatClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
        <h4>{recievingUserInfo.username}</h4>
      <Typography sx={{ p: 2, height:"250px", width:"250px", overflow:"scroll"}}>
      <p style ={{width:"50%"}}>
        hey how are you
      </p>
      </Typography>
    </Popover>
    </>
  )
}
