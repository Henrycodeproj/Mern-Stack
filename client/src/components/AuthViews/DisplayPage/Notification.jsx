import axios from "axios";
import { useEffect, useContext, useState} from "react";
import { accountContext } from "../../Contexts/appContext";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export const Notification = () => {
  const { 
    user,
    userNotification,
    setUserNotification,
    unreadNotifications,
    time, 
    } =
    useContext(accountContext);

    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };
  return (
    <>
      {userNotification.length > 0
        ? userNotification.map((entry) => (
            <MenuItem sx = {{background: entry.createdAt > time ? "gray" : "white"}}>
              <Avatar
                src={`https://ucarecdn.com/${entry.attendId.profilePicture}/`}
              />
              {`${entry.attendId.username} is now attending your event`}
            </MenuItem>
          ))
        : null}
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
