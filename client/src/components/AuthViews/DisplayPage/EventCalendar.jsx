import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./EventCalendar.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Truncating } from "../../ReusablesComponents/Truncating";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { accountContext } from "../../Contexts/appContext";
import { Posts } from "../Posts/Posting";

export const EventCalendar = () => {
  const { user, lastPostIndex, setPosts, posts } = useContext(accountContext);

  const [event, setEvent] = useState()
  useEffect(() => {
    async function getData() {
      const url = "http://localhost:3001/posts/all/posts";
      const response = await axios.get(url, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      });
      console.log(response.data)
      setEvent({ events: response.data });
    }
    getData();
  }, []);

  //const event = {
  //  events: [
  //      { title: 'pool', start: '2023-01-13T01:02:00.301Z', extendedProps:{pp:'11'} },
  //      { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
  //      { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
  //      { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
  //      { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
  //      { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
  //      { title: 'pool', start: '2023-01-13T01:02:00.301Z' },
  //      { title: 'grape', start: '2023-01-13T01:02:00.301Z' },
  //      { title: 'grape', start: '2023-01-17T01:02:00.301Z' },
  //      { title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis adipisci cum soluta repellat quia nihil deleniti accusantium, illum mollitia aut doloremque itaque esse omnis fugiat!', start: '2023-01-15T01:02:00.301Z' },
  //  ],
  //}

  function changeDefaultName(event) {
    return (event.text = event.shortText);
  }
  const header = {
    end: "prev,next",
  };
  async function eventLikeHandler(postId) {
    const data = {
      userID: user.id,
      postID : postId,
      postIndex: lastPostIndex 
    };
    const url = `http://localhost:3001/posts/event/like`
    const response = await axios
      .patch(url, data, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      })
    setPosts(response.updatedPosts)
  }

  function renderEventContent(eventInfo) {
    console.log(eventInfo.event.extendedProps)
    return (
      <>
        <div style={{ padding: "5px", width: "100%" }}>
          <div className="see">
            <h3
              style={{
                marginRight: "5px",
                width: "100%",
                display: "inline",
                color: "black",
              }}
            >
              {(eventInfo.timeText = eventInfo.timeText + "m")}
            </h3>
            <FavoriteBorderIcon
              sx={{ fontSize: "18px", color: "red", cursor: "pointer" }}
              onClick={()=> eventLikeHandler(eventInfo.event.id)}
            />
          </div>
          <div style={{ textTransform: "capitalize", width: "100%" }}>
            <Truncating
              postDescription={eventInfo.event.title}
              truncateNumber={25}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      {event && (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          initialEvents={event}
          eventContent={renderEventContent}
          editable={false}
          headerToolbar={header}
          height="400px"
          dayMaxEvents={0}
          moreLinkClassNames={changeDefaultName}
          eventMaxStack={-1}
        />
      )}
    </div>
  );
};
