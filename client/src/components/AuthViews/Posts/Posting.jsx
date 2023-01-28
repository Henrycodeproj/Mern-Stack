import "../Posts/Posting.css";
import { useState, useContext, useRef, useEffect } from "react";
import { accountContext } from "../../Contexts/appContext";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button } from "@mui/material";
import { TextAreaEmojis } from "../../ReusablesComponents/TextAreaEmojis";
import { LoadingCircle } from "../../ReusablesComponents/LoadingCircle";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { format } from "date-fns";
import { motion } from "framer-motion";

export const Posts = ({ lastPostIndex, setLastPostIndex }) => {
  const { user, setPosts } = useContext(accountContext);
  const ref = useRef();
  const postRef = useRef();

  const [status, setStatus] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [addEventTime, setAddEventTime] = useState(false);
  const [dateTime, setDateTime] = useState();
  const [userInfo] = useState(JSON.parse(localStorage.getItem("User")));

  const currentDate = new Date();
  const currentDateFormatted = format(currentDate, "yyyy-MM-dd'T'HH:mm");

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        postRef.current &&
        !postRef.current.contains(event.target) &&
        (event.target.offsetWidth >= postRef.current.offsetWidth + 50 ||
          event.target.offsetHeight >= postRef.current.offsetHeight + 10)
      ) {
        setAddEventTime(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [postRef]);

  const formHandler = (e) => {
    e.preventDefault();
    const data = {
      user: user.id,
      post: status,
      date: dateTime ? dateTime : null,
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
          setDateTime();
          setAddEventTime(false);
        } else throw Error;
      })
      .catch((err) => alert(err.response.data.message));
  };

  const handleDateandTime = (event) => {
    setDateTime(event.target.value);
  };

  if (user === null) return <LoadingCircle loadingState={user} />;

  return (
    <div className="add_post_container" ref={postRef}>
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
              {addEventTime ? (
                <TextField
                  id="datetime-local"
                  label="What time and day?"
                  type="datetime-local"
                  defaultValue={`${currentDateFormatted}`}
                  sx={{ width: 250 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleDateandTime}
                />
              ) : (
                <motion.div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => setAddEventTime(true)}
                  whileHover={{ scale: 1.1 }}
                >
                  <CalendarMonthIcon
                    sx={{
                      color: "black",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  />
                  <h3 style={{ color: "black" }}>Date</h3>
                </motion.div>
              )}
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
