import {useState} from "react"
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const SendMessage = ({post}) => {
    const [open, setOpen] = useState(false);  
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    return (
      <>
      {console.log(post)}
          <Tooltip title ={`Send ${post.posterId.username.toUpperCase() + post.posterId.username.slice(1)} a Message`}>
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
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>
      </>
    )
}

