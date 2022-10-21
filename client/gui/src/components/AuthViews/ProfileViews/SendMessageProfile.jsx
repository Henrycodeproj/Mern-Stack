import { useRef, useState, useContext} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { accountContext } from '../../Contexts/appContext';


export const SendMessageProfile = ({viewedUser, sendMessage, setSendMessage}) =>  {
        const ref = useRef()
        const [message, setMessage] = useState("")
        const {socket} = useContext(accountContext)
        const handleClickOpen = () => {
          setSendMessage(true);
        };

        const handleClose = () => {
          setSendMessage(false);
        };  
        const sendMessageHandler = () => {
            handleClose()
            //const Url = "http://localhost:3001/message/send"
            //const data = {
            //  chatId: currentPostConvoID,
            //  message: message,
            //  senderId: user.id,
            //  senderUsername: user.username,
            //  recipientId: post.posterId._id,
            //  recipientUsername: post.posterId.username
            //}
            //const res = await axios.post(Url, data, {
            //  headers:{
            //    "authorization":localStorage.getItem("Token")
            //  }
            //})
            //setMessage("")
            //saveNewMessage(data)
            //socket.emit("messages", data)
            //socket.emit("sendUserId", data)
        }
        return (
          <div>
          <Dialog
            open={sendMessage}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <div style={{
                  borderBottomStyle:"solid",
                  borderWidth:".5px"
              }}>
                  {/* To: {post.posterId.username.charAt(0).toUpperCase() + post.posterId.username.slice(1)} */}
              </div>
            </DialogTitle>
            <DialogContent>
              <h3 style = {{color:"black"}}>Your Message:</h3>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Write your message here"
                style={{ width: "300px", height:"auto"}}
                minRows = {10}
                onChange = { (e)=> setMessage(e.target.value) }
                ref = {ref}
              />
              {/* <TextAreaEmojis
              input = {ref.current}
              anchor = {anchorEl}
              setAnchor = {setAnchorEl}
              /> */}
            </DialogContent>
            <DialogActions sx = {{padding:"0 24px 20px"}}>
              <Button 
              className = "outlined_submit_button"
              variant = "outlined"
              color = "secondary"
              onClick={sendMessageHandler}
              >
              Send
              </Button>
            </DialogActions>
          </Dialog>
          </div>
        );
    }    