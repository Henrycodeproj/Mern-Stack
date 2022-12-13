import axios from "axios";
import { useEffect, useContext } from "react";
import { accountContext } from "../../Contexts/appContext";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

export const Notification = () => {
  const { user, userNotification, setUserNotification } =
    useContext(accountContext);
  return (
    <>
      {console.log(userNotification)}
      {userNotification.length > 0
        ? userNotification.map((entry) => (
            <MenuItem>
              <Avatar
                src={`https://ucarecdn.com/${entry.attendId.profilePicture}/`}
              />
              {`${entry.attendId.username} is now attending your event`}
            </MenuItem>
          ))
        : null}
    </>
  );
};
