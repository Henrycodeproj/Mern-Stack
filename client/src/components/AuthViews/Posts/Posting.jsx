import "../Posts/Posting.css";
import { useState, useContext, useRef, useEffect } from "react";
import { accountContext } from "../../Contexts/appContext";
import { Emojis } from "../../ReusablesComponents/Emojis";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { TextAreaEmojis } from "../../ReusablesComponents/TextAreaEmojis";
import { LoadingCircle } from "../../ReusablesComponents/LoadingCircle";
import Avatar from "@mui/material/Avatar";
import TextField from '@mui/material/TextField';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { format } from "date-fns";
import { motion } from "framer-motion";

export const Posts = ({ lastPostIndex, setLastPostIndex }) => {
  const { user, setPosts } = useContext(accountContext);
  const ref = useRef();
  const calendarRef = useRef();

  const [status, setStatus] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [time, setTime] = useState()
  const [addEventTime, setAddEventTime] = useState(false)

  const currentDate = new Date()
  const f = format(currentDate, "h:m a")
  //yyyy-MM-ddThh:mm
  const currentDateTime = format(currentDate, "yyyy-MM-dd'T'HH:mm")

  const [userInfo] = useState(JSON.parse(localStorage.getItem("User")));

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        calendarRef.current 
      && !calendarRef.current.contains(event.target) 
      && event.target.offsetWidth >= calendarRef.current.offsetWidth + 50
      ) {
        setAddEventTime(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef]);

  const formHandler = (e) => {
    e.preventDefault();
    const data = {
      user: user.id,
      post: status,
      date: time ? time : new Date()
    };
    const url = "http://localhost:3001/posts/";
    axios
      .post(url, data, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        if (res.status) {
          ref.current.value = "";
          setPosts((prevPosts) => [res.data.newestPost, ...prevPosts]);
          setLastPostIndex(lastPostIndex + 1);
          setStatus("");
        } else throw Error;
      })
      .catch((err) => alert(err.response.data.message));
  };

  const handleDateandTime = (event) => {
    setTime(event.target.value)
  }

  if (user === null) return <LoadingCircle loadingState={user} />;

  return (
    <div className="add_post_container">
      <Avatar
        className="input_picture"
        src={`https://ucarecdn.com/${userInfo.profilePicture}/`}
      />
      <div className="post_form_container">
        <div className="post_form">
          <TextareaAutosize
            className="status_post_textarea"
            placeholder={`Hi ${
              user.username.charAt(0).toUpperCase() + user.username.slice(1)
            }, what are you doing on campus today?`}
            onChange={(e) => setStatus(e.target.value)}
            ref={ref}
            minRows={3}
            maxRows={6}
          />
        </div>
        <div className="bottom_posts_container">
          <div className="bottom_icon_bar_wrapper">
            <div className="input_icons_bar">
              <TextAreaEmojis
                input={ref.current}
                anchor={anchorEl}
                setAnchor={setAnchorEl}
                title={true}
              />
              {
              addEventTime
              ? <TextField
              id="datetime-local"
              label="What time and day?"
              type="datetime-local"
              defaultValue={`${currentDateTime}`}
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
              ref = {calendarRef}
              onChange = {handleDateandTime}
              /> 
              : <div style={{display:"flex", alignItems:"center"}}>
                  <motion.div
                  whileHover={{scale: 1.1}}
                  >
                  <CalendarMonthIcon sx={{ color: "black", marginRight:"5px", cursor:"pointer" }} 
                  onClick = {()=> setAddEventTime(true)}
                  />
                  </motion.div>
                  <h3 style = {{color:"black"}}>Date</h3>
                </div>
              }
              <LocationOnIcon sx={{ color: "gray" }} />
            </div>
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={status ? (e) => formHandler(e) : null}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
