import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Popover from '@mui/material/Popover';
import {useState, useContext} from 'react';
import { accountContext } from '../../Contexts/appContext';
import { EditOption } from './EditOption';
import { ReportOption } from './ReportOption';
import { DeleteOption } from './DeleteOption';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedbackIcon from '@mui/icons-material/Feedback';


export const MoreOptions = ({post}) => {
const {user} = useContext(accountContext)

const [optionsAnchor, setOptionsAnchor] = useState(null)

const [deleteMessageOpen, setDelteMessageOpen] = useState(false);
const [editOpen, setEditOpen] = useState(false)
const [reportOpen, setReportOpen] = useState(false)

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

  const openReportOption = () => {
    MoreOptionsClose()
    setReportOpen(true)
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
          {
          post.posterId._id !== user.id &&
            <>
              <ListItem disablePadding>
                <ListItemButton onClick = {()=> openReportOption()}>
                  <ListItemIcon >
                    <FeedbackIcon />
                  </ListItemIcon>
                  <ListItemText primary="Report" />
                </ListItemButton>
              </ListItem>
            </>
          }
          {
          post.posterId._id === user.id &&
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
                <ListItemButton onClick={()=> 
                  {
                    setDelteMessageOpen(true)
                    MoreOptionsClose()
                  }
                }
                  >
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
      <ReportOption
      post = {post}
      reportOpen = {reportOpen}
      setReportOpen = {setReportOpen}
      />
      <DeleteOption
      post = {post}
      deleteMessageOpen = {deleteMessageOpen}
      setDelteMessageOpen = {setDelteMessageOpen}
      />
    </div>
  )
}
