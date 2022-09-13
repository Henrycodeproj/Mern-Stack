import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Popover from '@mui/material/Popover';
import {useState, useContext} from 'react';
import { accountContext } from '../../Contexts/appContext';
import axios from "axios";


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedbackIcon from '@mui/icons-material/Feedback';

export const MoreOptions = ({post}) => {

const [anchorEl, setAnchorEl] = useState(null);
const {user, posts, setPosts} = useContext(accountContext)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const postDeleteHandler = (postId) => {
    const URL = `http://localhost:3001/posts/delete/${postId}`
    const data = {userId: user.id}
    axios.delete(URL, {
      headers:{
        "authorization":localStorage.getItem("Token")
      },
      data:{
        data
      }
    })
    .then(res=> {
      const newPosts = posts.filter(post => post._id !== res.data)
      setPosts(newPosts)
    })
    .catch(err => console.log(err))
  }

  const open = Boolean(anchorEl);
  return (
    <div>
        <MoreHorizIcon onClick={handleClick} sx = {{cursor:"pointer"}}/>
        <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      > 
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon >
                <FeedbackIcon />
              </ListItemIcon>
              <ListItemText primary="Report" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=> postDeleteHandler(post._id)}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete"/>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover> 
    </div>
  )
}
