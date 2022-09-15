import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Popover from '@mui/material/Popover';
import {useState, useContext} from 'react';
import { accountContext } from '../../Contexts/appContext';
import { EditOption } from './EditOption';
import axios from "axios";


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedbackIcon from '@mui/icons-material/Feedback';

export const MoreOptions = ({post}) => {
const {user, posts, setPosts} = useContext(accountContext)

const [optionsAnchor, setOptionsAnchor] = useState(null);

const [editOpen, setEditOpen] = useState(false);

  const handleOptionsClick = (event) => {
    setOptionsAnchor(event.currentTarget);
  };

  const MoreOptionsClose = () => {
    setOptionsAnchor(null);
  };

  const openEditOption = () => {
    MoreOptionsClose()
    setEditOpen(true);
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

  const openOptions = Boolean(optionsAnchor);

  return (
    <div>
        <MoreHorizIcon onClick={handleOptionsClick} sx = {{cursor:"pointer"}}/>
        <Popover
        open={openOptions}
        anchorEl={optionsAnchor}
        onClose={MoreOptionsClose}
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
          {post.posterId._id === user.id &&
          <>
            <ListItem disablePadding>
              <ListItemButton onClick = {()=> openEditOption()}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit"/>
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
          </>
          }
        </List>
      </Popover>
      <EditOption 
      post = {post}
      editOpen = {editOpen}
      setEditOpen = {setEditOpen}
      />
    </div>
  )
}
