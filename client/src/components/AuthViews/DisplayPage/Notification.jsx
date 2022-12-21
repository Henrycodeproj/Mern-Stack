import axios from "axios";
import { useEffect, useContext, useState} from "react";
import { accountContext } from "../../Contexts/appContext";
import Avatar from "@mui/material/Avatar";
import { NotificationTabs } from "./NotificationTabs";

import ListItem from '@mui/material/ListItem';

export const Notification = () => {
  const { 
    userNotification,
    } =
    useContext(accountContext);

  return (
    <>
      {userNotification.length > 0
        ? userNotification.map((entry) => (
          <NotificationTabs
          entry = {entry}
          />
          ))
        : <ListItem>No current notifications</ListItem>}
    </>
  );
};

