import {useState, useContext, useEffect} from "react"
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import "./SendMessage.css"
import { accountContext } from "../../Contexts/appContext";
import axios from "axios"

export const SendMessage = ({post}) => {
    const {user} = useContext(accountContext)
    const [sendMessageOpen, setSendMessageOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [convoID, setConvoID] = useState(null)

    const handleClickOpen = async () => {
      setSendMessageOpen(true);
      const Url = "http://localhost:3001/conversation/create"
      console.log(user.id, post.posterId._id)
      const data = {user1:user.id, user2:post.posterId._id}
      const newConvoId = await axios.post(Url, data, {
        headers:{
            "authorization": localStorage.getItem("Token")
        }
      })
      if (newConvoId) setConvoID(newConvoId.data._id)
    };

    const handleClose = () => {
        setSendMessageOpen(false);
    };

    const sendChatMessage = async () =>{
      console.log(convoID,'convodsdadsad')
        handleClose()
        const Url = "http://localhost:3001/message/send"
        const data = {
          chatId:convoID,
          message:message,
          senderId:user.id,
          recipientId:post.posterId._id
        }
        const response = await axios.post(Url, data, {
          headers:{
            "authorization":localStorage.getItem("Token")
          }
        })
        setMessage("")
    }

    return (
      <>
          <Tooltip title ={`Send ${post.posterId.username.charAt(0).toUpperCase() + post.posterId.username.slice(1)} a Message`}>
          <SendIcon 
          className = "send_message_icon"
          onClick= {()=> handleClickOpen()} 
          sx = {{
              fontSize:"20px",
              color:"rgb(68, 68, 68)",
              cursor:"pointer",
              transform:"rotate(-20deg)",
              marginRight:"5px"
          }}
          />
          </Tooltip>
          <Dialog
          open={sendMessageOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div style={{
                borderBottomStyle:"solid",
                borderWidth:".5px"
            }}>
                To: {post.posterId.username.charAt(0).toUpperCase() + post.posterId.username.slice(1)}
            </div>
          </DialogTitle>
          <DialogContent>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Empty"
              style={{ width: "300px", height:"auto"}}
              minRows = {10}
              onChange = { (e)=> setMessage(e.target.value) }
              value = {message}
            />
          </DialogContent>
          <DialogActions sx = {{padding:"0 24px 20px"}}>
            <Button 
            className = "outlined_submit_button"
            variant = "outlined"
            color = "secondary"
            onClick={()=> sendChatMessage()}
            >
            Send
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
}

