import logo from "../../images/logo.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { accountContext } from "../Contexts/appContext";
import { motion } from "framer-motion";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import axios from "axios";
import "../navigation/navbar.css";
import {SearchBarModal} from "./SearchBarModal";

export const Navbar = () => {
  const navigateTo = useNavigate();
  const ref = useRef()
  const { 
    userStatus, 
    user, 
    logoutHandler, 
    socket 
  } = useContext(accountContext);

  const [profile, setProfile] = useState(null);
  const [notification, setNotification] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState()

  const navlogoutHandler = () => {
    socket.emit("logout", { userID: user.id });
    logoutHandler();
    setProfile(false);
  };

  const searchBarHandler = async (word) => {
    setSearch(word)
    const data = {
      "word": word 
    }
    const url = 'http://localhost:3001/posts/search'
    const searchResponse = await axios.post(url, data, {
      headers:{
        "authorization": localStorage.getItem("Token")
      }
    })

    if (searchResponse.data && searchResponse.data.length >= 1) {
      setSearchResults(searchResponse.data)
      setAnchorEl(ref.current)
    } else {
      setAnchorEl(null)
    }
  }
  const searchInputCheck = () => {
    if (search) setAnchorEl(ref.current)
    else setSearchResults([])
  }
  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const test = [1, 2];
  const open = Boolean(profile);

  const openProfile = (e) => {
    setProfile(e.currentTarget);
  };
  const closeProfile = () => {
    setProfile(null);
  };

  const notificationOpen = Boolean(notification);

  const handleClick = (event) => {
    setNotification(event.currentTarget);
  };

  const handleClose = () => {
    setNotification(null);
  };

  if (userStatus) {
    return (
      <nav>
        <img
          className="unplug_logo"
          src={logo}
          alt="logo"
          onClick={() =>
            !userStatus ? navigateTo("/") : navigateTo("/display")
          }
        />

        <div className="profile_section">
        <TextField
        ref = {ref}
        id="input-with-icon-textfield"
        placeholder="Search Unplug"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx = {{color:"white"}} className = "navy_search">
              <TravelExploreIcon sx = {{fontSize:"1.85rem"}}/>
            </InputAdornment>
          ),
        }}
        onChange = {(e) => searchBarHandler(e.target.value)}
        variant="standard"
        color = "secondary"
        sx={{
          '& .MuiInput-underline:before': { borderBottomColor: 'gray', borderBottomWidth:"2px" },
          '& .MuiInput-underline:after': { borderBottomColor: 'white' },
          width:"250px",
        }}
        className = "search_bar"
        onClick = {() => searchInputCheck()}
        />
        <SearchBarModal
        anchorEl = {anchorEl}
        setAnchorEl = {setAnchorEl}
        searchResults = {searchResults}
        setSearchResults = {setSearchResults}
        />


          <Badge badgeContent={4} color="error">
            <NotificationsIcon
              className="notification_bell"
              onClick={(e) => handleClick(e)}
            />
            <Popover
              open={notificationOpen}
              anchorEl={notification}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div className="Notifications_container">
                <MenuItem
                  sx={{
                    minWidth: "200px",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    justifyContent: "space-evenly",
                  }}
                >
                  <h2>Notifications</h2>
                  <span>
                    <RecordVoiceOverIcon />
                  </span>
                </MenuItem>
                <Divider />
                {test.map((item) => (
                  <div>
                    <MenuItem
                      sx={{ minWidth: "200px", justifyContent: "space-around" }}
                    >
                      <Avatar
                        src={
                          userInfo
                            ? `https://ucarecdn.com/${userInfo.profilePicture}/`
                            : ""
                        }
                      />
                      <p>User liked your post</p>
                    </MenuItem>
                    <Divider />
                  </div>
                ))}
              </div>
            </Popover>
          </Badge>
          <div>
            <IconButton
              onClick={openProfile}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                sx={{ width: 35, height: 35 }}
                className="faker1"
              ></Avatar>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={profile}
              open={open}
              onClose={closeProfile}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{ width: "400px" }}
            >
              <MenuItem
                sx={{ minWidth: "180px" }}
                onClick={() => {
                  closeProfile();
                  navigateTo(`/profile/${user.id}`, { replace: true });
                }}
              >
                <AccountCircleIcon
                  className="profile_menu_icon"
                  sx={{ mr: 2 }}
                />
                <div>Profile</div>
              </MenuItem>
              <MenuItem sx={{ minWidth: "180px" }} onClick={closeProfile}>
                <SettingsIcon className="profile_menu_icon" sx={{ mr: 2 }} />
                <div>Settings</div>
              </MenuItem>
              <MenuItem
                sx={{ minWidth: "180px" }}
                onClick={() => navlogoutHandler()}
              >
                <LogoutIcon className="profile_menu_icon" sx={{ mr: 2 }} />
                <div>Logout</div>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav>
      {!userStatus ? (
        <motion.div whileHover={{ scale: 1.1 }}>
          <img
            className="unplug_logo"
            style={{ maxWidth: "100%" }}
            src={logo}
            alt="logo"
            onClick={() => navigateTo("/")}
          />
        </motion.div>
      ) : (
        <div>
          <img
            className="unplug_logo"
            src={logo}
            alt="logo"
            onClick={() => navigateTo("/display")}
          />
        </div>
      )}
      <div className="profile_section">
        <div>
          <Button variant="contained" color="secondary">
            <a
              href="mailto:lihenryhl.work@gmail.com"
              style={{ color: "white", textDecoration: "none" }}
            >
              Contact
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};
