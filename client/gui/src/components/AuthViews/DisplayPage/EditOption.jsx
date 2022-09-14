import {useState} from "react";
import axios from "axios"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Picker from 'emoji-picker-react';



export const EditOption = ({post, editOpen, setEditOpen}) => {

    const [postDescription, setPostDescription] = useState(post.Description)

    const closeEditOption = () => {
        setEditOpen(false);
    };

  const onEmojiClick = (emojiObject) => {
    setPostDescription(postDescription + emojiObject.emoji)
  };

    // const submitEdit = () =>{
    //     axios.patch()
    // }
    
  return (
    <>
        <Dialog
        open={editOpen}
        onClose={closeEditOption}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Edit Current Post"}
        </DialogTitle>
        <DialogContent sx={{width: "300px", height: "300px"}}>
            <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Empty"
            style={{ width: 300 }}
            onChange = {e => setPostDescription(e.target.value)}
            value = {postDescription}
            rows = {10}
            >
            {postDescription}
            </TextareaAutosize>
            <Picker 
            onEmojiClick={onEmojiClick}
            />
        </DialogContent>
        <DialogActions>
            <Button variant="contained" size="medium" color="secondary">
              Submit
            </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
